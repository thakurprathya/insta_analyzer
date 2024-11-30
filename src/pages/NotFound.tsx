import { useEffect } from "react";

const NotFound = () => {
    useEffect(()=>{
        scrollTo(0, 0);
    },[])

    return (
        <div className="flex items-center justify-center w-full h-full p-10 text-[#FFF6E9]">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-red-600">404</h1>
                <p className="text-xl mt-4">Page Not Found</p>
            </div>
        </div>
    )
}

export default NotFound
