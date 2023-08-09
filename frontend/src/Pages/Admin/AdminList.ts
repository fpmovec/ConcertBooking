const admins: string[] = ['10.maks.10k@gmail.com'];

export const isAdmin = (email: string) => admins.includes(email);