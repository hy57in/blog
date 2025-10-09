import { getViewsCount, incrementView } from "queries/db";

type Props = {
  slug: string;
}

export const ViewCount = async ({slug}: Props) => {
  await incrementView(slug);
  const views = await getViewsCount();
  const count = views.find((view) => view.slug === slug)?.count || 0;

  return (
  <p className="text-sm text-text-secondary dark:text-text-secondary-dark">
    {count?.toLocaleString()} Views
  </p>
  )
}