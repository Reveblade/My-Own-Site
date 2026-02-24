import { useLanyard } from '../hooks/useLanyard';
import { config } from '../utils/config';
import './Quote.css';

const FALLBACK_QUOTE = 'Ben ezelden beridir hür yaşadım. Hür yaşarım.';

export function Quote() {
  const { data } = useLanyard(config.discordUserId);

  const customStatus = data?.activities?.find((a) => a.type === 4);
  const bio = customStatus?.state ?? FALLBACK_QUOTE;

  return (
    <blockquote className="quote" cite="">
      <p className="quote__text">{bio}</p>
    </blockquote>
  );
}
