// src/components/Home/GitHubProfileCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import useGithubStats from '@/hooks/useGithubStats';
import {
  ArrowTopRightOnSquareIcon,
  BuildingOffice2Icon,
  MapPinIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import Image from 'next/image';

type GitHubProfileCardProps = {
  username: string;
};

const GitHubProfileCard = ({ username }: GitHubProfileCardProps) => {
  const stats = useGithubStats(username);

  if (stats.loading) {
    return (
      <Card className="w-full max-w-md animate-pulse">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700"></div>
              <div className="h-3 w-1/2 rounded bg-gray-200 dark:bg-gray-700"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (stats.error || !stats.avatarUrl) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      <Card className="overflow-hidden">
        <CardHeader className="pb-0">
          <CardTitle className="flex items-center justify-between">
            <span>GitHub Profile</span>
            <a
              href={stats.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              View on GitHub
              <ArrowTopRightOnSquareIcon className="h-3 w-3" />
            </a>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full border-2 border-border">
              <Image
                src={stats.avatarUrl}
                alt={`${username}'s GitHub avatar`}
                width={64}
                height={64}
                className="object-cover"
                priority={false}
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg truncate">{stats.name || username}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">{stats.bio}</p>
              <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
                {stats.location && (
                  <span className="flex items-center gap-1">
                    <MapPinIcon className="h-3 w-3" />
                    {stats.location}
                  </span>
                )}
                {stats.company && (
                  <span className="flex items-center gap-1">
                    <BuildingOffice2Icon className="h-3 w-3" />
                    {stats.company}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <UsersIcon className="h-3 w-3" />
                  {stats.followers} followers · {stats.following} following
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-muted p-3 text-center">
              <div className="text-2xl font-bold">{stats.totalRepos}</div>
              <div className="text-xs text-muted-foreground">Repositories</div>
            </div>
            <div className="rounded-lg bg-muted p-3 text-center">
              <div className="text-2xl font-bold">{stats.contributionsThisYear}</div>
              <div className="text-xs text-muted-foreground">Contributions</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default GitHubProfileCard;