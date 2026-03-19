import { PublicTraderProfile } from "@/components/public-trader-profile";
import { MOCK_TRADER_PROFILE } from "@/lib/mock-trader-profile";

interface PageProps {
  params: Promise<{ traderId: string }>;
}

export default async function TraderProfilePage({ params }: PageProps) {
  const { traderId } = await params;
  // TODO: fetch profile by traderId from API; for now use mock
  const profile = MOCK_TRADER_PROFILE;
  return (
    <main className="flex-1 py-8 px-4 sm:px-6">
      <PublicTraderProfile profile={profile} />
    </main>
  );
}
