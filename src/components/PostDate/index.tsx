import { dateDistanceToNow, formatDate } from "@/utils/format-datetime";

type PostDateProps = {
  dateTime: string;
};

export default function PostDate({ dateTime }: PostDateProps) {
  return (
    <time
      dateTime={formatDate(dateTime)}
      className="text-slate-600 block text-sm/tight"
      title={dateDistanceToNow(dateTime)}
    >
      {formatDate(dateTime)}
    </time>
  );
}
