import Session from './Session';

const Utils = {
    objectToQueryString: (obj: any) => {
        const str: any = [];
        Object.keys(obj).forEach((key) => {
            if (obj[key] != null && obj[key] !== undefined && obj[key] !== '') {
                str.push(
                    `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`
                );
            }
        });

        return str.join("&");
    },
    replaceParams: (url: string, data: any) => {
        if (!url) {
            return "";
        }
        if (!data) {
            return url;
        }

        url = url.replace(/:[a-zA-Z]*/g, (key) => {
            const keyReplace = key.replace(":", "");
            return data[keyReplace] ? data[keyReplace] : `:${keyReplace}`;
        });

        url = url.replace(/\{(.*?)}/g, (_p, term) => {
            return data[term] || '';
        })

        return url;
    },
    isNotEmptyArray: (array: []) => {
        return array && Array.isArray(array) && array.length > 0;
    },
    isNotEmptyObject: (obj: object) => {
        return obj && typeof obj === 'object' && Object.keys(obj).length > 0;
    },
    queryToJson: (query: string) => {
        const params: any = {};
        query.replace(/([^=&]+)=([^&]*)/g, (_, k, v) => (params[k] = v));
        return params;
    },
    copyToClipboard: (value: string) => {
        if (!value || !navigator.clipboard) return;
        navigator.clipboard.writeText(value);
    },
    validateEmail: (email: string) => {
        const rgnx = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/g;
        return rgnx.test(email)
    },
    formatDate: (date: any, opts?: any) => {
        const { format = 'dd/mm/yyyy' } = opts || {};

        if (!date) return '';

        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        const hours = String(d.getHours()).padStart(2, '0');
        const minutes = String(d.getMinutes()).padStart(2, '0');

        return format
            .replace('dd', day)
            .replace('mm', month)
            .replace('yyyy', year)
            .replace('hh', hours)
            .replace('mm', minutes);
    },
    formatFirebaseDate: (date: any) => {
        const { seconds } = date || {};

        if (!seconds) {
            return '';
        }

        const d = new Date(seconds * 1000);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();

        return `${day}/${month}/${year}`;
    },
    getRemainingTime: (date: any) => {
        const { seconds } = date || {};
        const now = new Date().getTime() / 1000;

        if (!seconds) {
            return '';
        }

        const due = seconds;
        const diff = due - now;
        const minutes = Math.floor(diff / 60);

        return minutes;
    },
    getFormatRemainingTime: (date: any) => {
        const minutes = Number(Utils.getRemainingTime(date));

        if (minutes <= 60) return `${minutes} min`;

        const hours = Math.floor(minutes / 60);
        if (minutes > 60 && minutes < 1440) return `${hours}h`;

        const days = Math.floor(hours / 24);
        const remainingHours = hours % 24;
        if (minutes >= 1440) return `${days}d ${remainingHours}h`;
    },
    getFormData: (form: any) => {
        let data: any = {};

        if(form) {
            data = new FormData(form);
        } else {
            document.querySelectorAll('input, select, textarea').forEach((input: any) => {
                if (input.classList.contains('form-control')) {
                    data[input.id] = input.value;
                }
            });
        }

        return data;
    },
    getNestedData: (name:string, data:any) => {
        if (!name) {
            return '';
        }
        const nested = name.split('.');
        let value = data;
        for (const nest of nested) {
            if (typeof value === 'string') {
                try {
                    value = JSON.parse(value);
                } catch (error) {
                    return console.error('Error parsing JSON');
                }
            }
            value = value instanceof FormData ? value.get(nest) : value[nest];

            if ((value === undefined || value === null)) {
                return '';
            }
        }
        return value;
    },
    getToday: (lang: string = 'es') => {
        const days: { [key: string]: string[] } = {
            es: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
            en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        };
        const today = new Date().getDay();
        return days[lang][today] || '';
    },
};
export default Utils;
