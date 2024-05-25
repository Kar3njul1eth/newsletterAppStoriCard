import { Newsletter } from '../models/Newsletter';
import { User } from '../models/User';

export const getTemplate = (newsletter: Newsletter, user: User): string => {
  return `
    <div>
      <h1>${newsletter.subject}</h1>
      <p>${newsletter.content}</p>
      <a href="${newsletter.callToActionLink}">${newsletter.callToActionLabel}</a>
    </div>
  `;
};
