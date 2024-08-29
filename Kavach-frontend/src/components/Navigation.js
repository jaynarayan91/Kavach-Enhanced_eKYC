import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import logo from '../assets/logo.png'
import loginButton from '../assets/right-to-bracket-solid.svg'
import signUp from '../assets/signup.svg'
import UserLogSignButton from './UserLogSignButton'
import { Link, useLocation } from 'react-router-dom'
import React from 'react'

const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Features', href: '/features' },
    { name: 'Team', href: '/team' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export default function Navigation() {
    const location = useLocation();

    return (
        <Disclosure as="nav" className="bg-gray-300 w-5/6 m-auto rounded-full mt-2">
            <div className="max-w-7xl sm:px-6">
                <div className="relative flex h-16 items-center justify-between py-10">
                    <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                        {/* Mobile menu button*/}
                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                            <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
                        </DisclosureButton>
                    </div>

                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start cursor-pointer">
                        <div className="flex flex-shrink-0 items-center">
                            <img
                                alt="Kavach"
                                src={logo}
                                className="h-20"
                            />
                        </div>

                        <div className="hidden m-auto items-center sm:ml-auto sm:block">
                            <div className="flex items-center">
                                {/* Include Link to each navbar element */}
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        aria-current={location.pathname === item.href ? 'page' : undefined}
                                        className={classNames(
                                            location.pathname === item.href ? 'bg-[#608CFE] text-md text-black font-semibold' : 'font-semibold text-md text-black hover:bg-black hover:text-white transform hover:scale-110 transition duration-500 ease-in-out ',
                                            'text-md mx-[10px] font-semibold rounded-full px-4 py-3 font-medium transform hover:scale-110 transition duration-500 ease-in-out ',
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <Link to='/login'>
                            <UserLogSignButton logo={loginButton} toolTipData="Login" />
                        </Link>
                        <Link to='/signup'>
                            <UserLogSignButton logo={signUp} toolTipData="Sign-Up" />
                        </Link>
                    </div>
                </div>
            </div>

            <DisclosurePanel className="sm:hidden">
                <div className="pt-2">
                    {navigation.map((item) => (
                        <DisclosureButton
                            key={item.name}
                            as="a"
                            href={item.href}
                            aria-current={item.current ? 'page' : undefined}
                            className={classNames(
                                item.current ? 'bg-[#608CFE] text-md text-black font-semibold' : 'font-semibold text-md text-black hover:bg-black hover:text-white',
                                'block rounded-md px-3 py-2 text-base font-medium',
                            )}
                        >
                            {item.name}
                        </DisclosureButton>
                    ))}
                </div>
            </DisclosurePanel>
        </Disclosure>
    )
}
