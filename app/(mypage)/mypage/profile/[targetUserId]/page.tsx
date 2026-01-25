import ProfileDetailClient from "./ProfileDetailClient";

export default async function ProfileDetailPage({
  params,
}: {
   params: Promise<{ targetUserId: string }>; 
}) {
   const { targetUserId } = await params;

  return (
    <ProfileDetailClient targetUserId={targetUserId} />
  );
}