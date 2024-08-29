import React from 'react';
import { motion, useAnimation } from 'framer-motion'; // Import useAnimation hook

function Loading() {
    // const [loading, setLoading] = useState(true);
    const controls = useAnimation(); // Use useAnimation hook

    // useEffect(() => {
    //     setTimeout(() => {
    //         setLoading(false);
    //     }, 3000);
    // }, []);

    // useEffect(() => {
    //     if (loading) {
    //         controls.start({
    //             opacity: 1,
    //             transition: { duration: 0.5 }
    //         });
    //     } else {
    //         controls.start({
    //             opacity: 0,
    //             transition: { duration: 0.1 }
    //         });
    //     }
    // }, [loading, controls]);

    return (

        <motion.div
            className="fixed bg-white h-screen top-0 left-0 w-full h-full flex justify-center items-center z-10"
            animate={controls}
        >
            <div className="p-4 rounded-md">
                <div className="flex justify-center">
                    <>
                        <motion.span
                            className="w-4 h-4 my-12 mx-1 bg-[#608CFE] rounded-full"
                            animate={{
                                y: [0, -20, 0],
                                opacity: [1, 0], // Fades out
                                transition: { duration: 1, repeat: 2 }
                            }}
                        />
                        <motion.span
                            className="w-4 h-4 my-12 mx-1 bg-[#608CFE] rounded-full"
                            animate={{
                                y: [0, -20, 0],
                                opacity: [1, 0], // Fades out
                                transition: { duration: 1, repeat: 1.5, delay: 0.1 }
                            }}
                        />
                        <motion.span
                            className="w-4 h-4 my-12 mx-1 bg-[#608CFE] rounded-full"
                            animate={{
                                y: [0, -20, 0],
                                opacity: [1, 0], // Fades out
                                transition: { duration: 1, repeat: 1.3, delay: 0.2 }
                            }}
                        />
                    </>
                </div>
            </div>
        </motion.div>

    );
}

export default Loading;