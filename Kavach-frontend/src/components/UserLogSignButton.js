import React from 'react'
import { Tooltip } from 'react-tooltip'

const UserLogSignButton = ({ logo, toolTipData }) => {
    return (
        <div>
            <Tooltip anchorSelect={'#' + toolTipData}>
                {toolTipData}
            </Tooltip>
            {toolTipData === "Login" ?
                <button
                    id={toolTipData}
                    className="font-semibold flex items-center px-4 py-2 bg-[#608CFE] text-lg rounded-full shadow-2xl hover:from-blue-600 hover:via-blue-700 hover:to-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-70 active:bg-blue-800 active:shadow-inner transform hover:scale-110 transition duration-500 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed ml-4"
                    aria-label={toolTipData}>
                    <img alt={toolTipData} src={logo} className="h-5" />
                    {/* <span class="text-xs text-gray-500 hidden">Login</span> */}
                </button>
                :
                < button
                    id={toolTipData}
                    className="font-semibold flex items-center px-4 py-2 border-2 border-[#608CFE] text-md rounded-full shadow-2xl hover:from-blue-600 hover:via-blue-700 hover:to-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-70 active:bg-blue-800 active:shadow-inner transform hover:scale-110 transition duration-500 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed ml-4"
                    aria-label={toolTipData}>
                    <img alt={toolTipData} src={logo} className="h-4" />
                    {/* <span class="text-xs text-gray-500 hidden"></span> */}
                </button>
            }
        </div >
    )
}


export default UserLogSignButton