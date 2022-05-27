// eslint-disable-next-line @typescript-eslint/ban-types
export function pick<T extends object>(obj: T, k: (keyof T)[]) {
  const shadow: Partial<T> = {};
  k.forEach((el) => {
    shadow[el] = obj[el];
  });
  return shadow;
}

// simple email checker
export function allowedEmail(mail: string) {
  if (!mail) return false;
  const domain = mail.split('@')[1];
  const reg = /shopee|airpay|foody|seamoney|seagroup/;
  return domain && reg.test(domain);
}

export const urlParams = (obj: Record<string, number | string>) => {
  if (!obj) return '';
  return Object.keys(obj)
    .map((k) => `${k}=${obj[k] || ''}`)
    .join('&');
};
