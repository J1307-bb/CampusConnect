import { Alert, Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import * as Sentry from "@sentry/react-native";

import Constants from "expo-constants";
import Http from "./Http";
import Session from "./Session";

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
});

const NotificationService = {
    handleRegistrationError: (errorMessage: string) => {
        Alert.alert("Error", errorMessage);
        Sentry.captureMessage(`Error registering for push notifications: ${errorMessage}`);
    },
    registerToken: async (token: string) => {
        const { id: idEstudiante } = await Session.getSessionData();
        if (!idEstudiante) return NotificationService.handleRegistrationError("Session data not found");

        const { data: [dispositivos] } = await Http.get("/dispositivos", { idEstudiante });

        try {
            if (dispositivos) {
                const { tokens = [], id } = dispositivos;

                if (tokens.includes(token)) return;

                await Http.put(`/dispositivos/${id}`, { ...dispositivos, tokens: [...tokens, token] });
            } else {
                await Http.post("/dispositivos", { idEstudiante, tokens: [token] });
            }
        } catch (e: any) {
            NotificationService.handleRegistrationError(e?.error || e?.message || `${e}`);
        }
    },
    registerDevice: async () => {
        if (Platform.OS === "android") {
            Notifications.setNotificationChannelAsync("default", {
                name: "default",
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: "#FF231F7C",
                sound: "notification_sound.wav",
            });
        }

        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();

            let finalStatus = existingStatus;

            if (existingStatus !== "granted") ({ status: finalStatus } = await Notifications.requestPermissionsAsync());
            if (finalStatus !== "granted") return NotificationService.handleRegistrationError("Permission not granted to get push token for push notification!");

            const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;

            if (!projectId) NotificationService.handleRegistrationError("Project ID not found");

            try {
                const pushTokenString = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
                await NotificationService.registerToken(pushTokenString);
                return pushTokenString;
            } catch (e: unknown) {
                NotificationService.handleRegistrationError(`${e}`);
            }
        } else {
            NotificationService.handleRegistrationError("Must use physical device for push notifications");
        }
    },
    sendNofication: (opts: any) => {
        const { type = 'grupo', to, message } = opts;

        try {
            Http.post("/notificaciones", { type, to, message });
        } catch (e: any) {
            Sentry.captureException(e);
        }
    },
};

export default NotificationService;
