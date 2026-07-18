import { formatDistanceToNowStrict } from "date-fns";

export function formatRelativeTime(timestamp: string): string {
  return formatDistanceToNowStrict(new Date(timestamp), {
    addSuffix: true,
  });
}