import Image from 'next/image';
import React, { useState } from 'react';
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
import { useRouter } from 'next/router';
import useOutsideClick from '../hooks/useOutsideClick';

/**
 * 헤더
 * @returns
 */
function Header() {
  const { data: session } = useSession();
  const router = useRouter();

  //? 모바일 메뉴 제어 관련
  const [isOpened, setIsOpened] = useState(false);
  const ref = useOutsideClick(() => setIsOpened(false));

  return (
    <header className="sticky top-0 z-50 flex items-center bg-white px-4 py-2 shadow-sm">
      {/* 로고 */}
      <div className="relative h-10 w-20 flex-shrink-0 cursor-pointer">
        <Image
          src="https://links.papareact.com/fqy"
          onClick={() => router.push('/')}
          alt="Logo"
          layout="fill"
          objectFit="contain"
        />
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

      {/* 햄버거 메뉴 (모바일) */}
      <div ref={ref} className="relative ml-5 flex items-center lg:hidden">
        <MenuIcon
          role="button"
          onClick={() => setIsOpened((prev) => !prev)}
          className="icon"
        />
        <ul
          className={`absolute top-10 right-0 z-50 w-48 cursor-pointer divide-y overflow-hidden bg-white text-center transition-all duration-500 ease-in-out ${
            isOpened ? 'max-h-60' : 'max-h-0'
          }`}
        >
          <li>
            {session ? (
              <div
                onClick={() => signOut()}
                className="flex cursor-pointer items-center space-x-2 border border-gray-100 p-2"
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
                className="flex cursor-pointer items-center space-x-2 border border-gray-100 p-2"
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
          </li>
          <li>메뉴 아이템 1</li>
          <li>메뉴 아이템 2</li>
          <li>메뉴 아이템 3</li>
        </ul>
      </div>

      {/* 로그인, 로그아웃 버튼 (일반 화면) */}
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
