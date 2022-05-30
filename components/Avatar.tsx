import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';

type AvatarProps = {
  seed?: string;
  large?: boolean;
};

function Avatar({ large, seed }: AvatarProps) {
  const { data: session } = useSession();

  return (
    <div
      className={`relative h-10 w-10 overflow-hidden rounded-full border-gray-300 bg-white ${
        large && 'h-20 w-20'
      }`}
    >
      <Image
        src={`https://avatars.dicebear.com/api/open-peeps/${
          seed || session?.user?.name || 'placeholder'
        }.svg`}
        layout="fill"
        alt="avatar"
      />
    </div>
  );
}

export default Avatar;
