interface Newsletter {
  subject: string;
  content: string;
  callToActionLabel: string;
  callToActionLink: string;
}

interface User {
  id: number;
  email: string;
  subscribed: boolean;
}

export const getTemplate = (newsletter: Newsletter, user: User): string => {
  return `
    <div>
      <h1>${newsletter.subject}</h1>
      <p>${newsletter.content}</p>
      <a href="${newsletter.callToActionLink}">${newsletter.callToActionLabel}</a>
    </div>
  `;
};
