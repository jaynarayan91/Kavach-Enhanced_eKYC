import React from 'react';

import config from '../config/index.json';
import Navigation from './Navigation';

const Features = () => {
    const { features } = config;
    const { title, subtitle, description, items: featuresList } = features;
    return (
        <>
            <Navigation />
            <div className={`py-6 bg-background`} id="features">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:text-center pb-[30px]">
                        <div className="mb-[20px] block relative transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-[#608CFE] before:origin-center before:h-[3px] before:w-[1%] hover:before:w-[8%] before:bottom-[-5px] before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-[#608CFE] after:origin-center after:h-[3px] after:w-[1%] hover:after:w-[8%] after:bottom-[-5px] after:right-[50%]">
                            <h2 className="text-center text-3xl font-bold">
                                {title}
                            </h2>
                        </div>
                        <p className="mt-2 text-2xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            {subtitle}
                        </p>
                        <p className="mt-4 max-w-xl text-l text-gray-500 lg:mx-auto">
                            {description}
                        </p>
                    </div>

                    <div>
                        <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-4 md:gap-y-4 bg-[#608CFE] rounded-xl p-4">
                            {featuresList.map((feature) => (
                                <div key={feature.name} className="hover:scale-105 duration-300 relative shadow-md bg-gray-100 p-4 rounded-xl">
                                    <dt>
                                        <div
                                            className={`absolute translate-y-[50%] color-[#608CFE] absolute flex items-center justify-center h-12 w-12 rounded-md bg-background text-tertiary border-[red] border-4`}
                                        >
                                            <i
                                                className={`inline-block text-[25px] rounded-full ` + feature.icon}
                                            />
                                        </div>
                                        <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                                            {feature.name}
                                        </p>
                                    </dt>
                                    <dd className="mt-2 ml-16 text-base text-gray-500">
                                        {feature.description}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Features;