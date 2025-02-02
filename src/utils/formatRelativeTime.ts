import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export function formatRelativeTime(dateString: string): string {
    const date = dayjs(dateString);
    const now = dayjs();

    const yearsDiff = now.diff(date, 'year');
    const monthsDiff = now.diff(date, 'month');
    const daysDiff = now.diff(date, 'day');
    const hoursDiff = now.diff(date, 'hour');
    const minutesDiff = now.diff(date, 'minute');

    if (yearsDiff > 0) {
        return `${yearsDiff} yr${yearsDiff > 1 ? 's' : ''} ago`;
    }

    if (monthsDiff > 0) {
        return `${monthsDiff} mo.${monthsDiff > 1 ? 's' : ''} ago`;
    }

    if (daysDiff > 0) {
        return `${daysDiff} day${daysDiff > 1 ? 's' : ''} ago`;
    }

    if (hoursDiff > 0) {
        return `${hoursDiff} hr${hoursDiff > 1 ? 's' : ''} ago`;
    }

    if (minutesDiff > 0) {
        return `${minutesDiff} min${minutesDiff > 1 ? 's' : ''} ago`;
    }

    return 'just now';
}


export function formatRelativeTimeSimple(dateString: string): string {
    return dayjs(dateString).fromNow();
}