import { getAccessToken } from "../Authorization/AuthProvider";

export const SendConfirmationCode = async (email: string) => {
  const emailDto: EmailDto = {
    emailaddress: email,
  };
  await fetch(`http://localhost:5207/Email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + `${await getAccessToken()}`,
    },
    body: JSON.stringify(emailDto),
  });
};

export const GetConfirmationCode = async (): Promise<string> => {
  const response = await fetch(`http://localhost:5207/Email/confirmation`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + `${await getAccessToken()}`,
    },
  });

  const code = (await response.json()) as string;
  return code;
};

interface EmailDto {
  emailaddress: string;
}
