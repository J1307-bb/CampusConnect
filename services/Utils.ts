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
    formatDate: (date: string) => {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
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
};
export default Utils;
