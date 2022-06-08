import Image from 'next/image';
import React from 'react';
import {
  BellIcon,
  ChatIcon,
  ChevronDownIcon,
  GlobeIcon,
  HomeIcon,
  MenuIcon,
  PlusIcon,
  SearchIcon,
  SparklesIcon,
  SpeakerphoneIcon,
  VideoCameraIcon,
} from '@heroicons/react/solid';
import { signIn, signOut, useSession } from 'next-auth/react';

/**
 * 헤더
 * @returns
 */
function Header() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 flex bg-white px-4 py-2 shadow-sm">
      {/* 로고 */}
      <div className="relative h-10 w-20 flex-shrink-0 cursor-pointer">
        <Image src="https://links.papareact.com/fqy" alt="Logo" layout="fill" objectFit="contain" />
      </div>

      {/* 메뉴 아이콘 */}
      <div className="mx-7 flex items-center xl:min-w-[300px]">
        <HomeIcon className="h-5 w-5" />
        <p className="ml-2 hidden flex-1 lg:inline">Home</p>
        <ChevronDownIcon className="h-5 w-5" />
      </div>

      {/* 검색바 */}
      <form className="flex flex-1 items-center space-x-2 rounded-sm border border-gray-200 bg-gray-100 px-3 py-1">
        <SearchIcon className="h-6 w-6" />
        <input
          type="search"
          className="flex-1 bg-transparent outline-none"
          placeholder="Search Reddit 😃"
        />
        <button type="submit" hidden>
          검색
        </button>
      </form>

      {/* 아이콘들 */}
      <div className="mx-5  hidden items-center space-x-2 text-gray-500 lg:inline-flex">
        <SparklesIcon className="icon" />
        <GlobeIcon className="icon" />
        <VideoCameraIcon className="icon" />
        <hr className="h-10 border border-gray-100" />
        <ChatIcon className="icon" />
        <BellIcon className="icon" />
        <PlusIcon className="icon" />
        <SpeakerphoneIcon className="icon" />
      </div>
      <div className="ml-5 flex items-center lg:hidden">
        <MenuIcon className="icon" />
      </div>

      {/* 로그인, 롤그아웃 버튼 */}
      {session ? (
        <div
          onClick={() => signOut()}
          className="hidden cursor-pointer items-center space-x-2 border border-gray-100 p-2 lg:flex"
        >
          <div className="relative h-5 w-5 flex-shrink-0">
            <Image
              src="https://links.papareact.com/23l"
              layout="fill"
              objectFit="contain"
              alt="Auth Icon"
            />
          </div>

          <div className="flex-1 text-xs">
            <p className="truncate">{session.user?.name}</p>
            <p className="text-gray-400">1 Karma</p>
          </div>

          <ChevronDownIcon className="h-5 flex-shrink-0 text-gray-400" />
        </div>
      ) : (
        <div
          onClick={() => signIn()}
          className="hidden cursor-pointer items-center space-x-2 border border-gray-100 p-2 lg:flex"
        >
          <div className="relative h-5 w-5 flex-shrink-0">
            <Image
              src="https://links.papareact.com/23l"
              layout="fill"
              objectFit="contain"
              alt="Auth Icon"
            />
          </div>
          <p className="text-gray-400">Sign In</p>
        </div>
      )}
    </header>
  );
}

export default Header;
