import JSZip from "jszip";
import { cn } from "../lib/utils";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { IconUpload } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";
import { ProcessFiles } from "../lib/middlewares";
import config from "../config/config.json";

const mainVariant = {
    initial: {
        x: 0,
        y: 0,
    },
    animate: {
        x: 20,
        y: -20,
        opacity: 0.9,
    },
};

const secondaryVariant = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
    },
};

interface FileUploadProps {
    setLinks: React.Dispatch<React.SetStateAction<{[key: string]: any}>>;
    onChange?: (files: File[]) => void;
}

export const FileUpload = ({
    setLinks,
    onChange,
}: FileUploadProps) => {
    const [files, setFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const HandleFileChange = async (newFiles: File[]) => {
        for (const file of newFiles) {
            if (file.type === "application/zip" || file.type === "application/x-zip-compressed") {
                try {
                    const zip = new JSZip();
                    const contents = await zip.loadAsync(file);
                    const followersFolder = contents.folder(config["connections-folder-directory"]);
                    if (!followersFolder) {
                        alert("Required directory missing");
                        return;
                    }
                    const files = Object.values(followersFolder.files);
                    const requiredFiles = config["required-files"];
                    
                    const filteredFiles = files.filter(file => {
                        const fileName = file.name.split('/').pop();
                        return fileName && requiredFiles.includes(fileName);
                    });

                    const results = await ProcessFiles(filteredFiles);
                    setLinks(results);
                    
                } catch (error) {
                    console.error("Error processing files:", error);
                    alert("Error processing files");
                }
            } else {
                alert("Uploaded file is not supported");
            }
        }
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
        onChange && onChange(newFiles);
    };

    const HandleClick = () => {
        fileInputRef.current?.click();
    };

    const { getRootProps, isDragActive } = useDropzone({
        multiple: false,
        noClick: true,
        onDrop: HandleFileChange,
        onDropRejected: (error) => {
            console.log(error);
        },
        noDrag: false,
        getFilesFromEvent: async (event: any) => {
            if (event instanceof DragEvent && event.dataTransfer) {
                const items = event.dataTransfer.items;
                const files = Array.from(items)
                    .filter(item => item.kind === 'file')
                    .map(item => item.getAsFile())
                    .filter((file): file is File => file !== null);
                return files;
            }
            
            const target = event?.target as HTMLInputElement;
            if (target?.files) {
                return Array.from(target.files);
            }
            
            return [];
        },
    });

    return (
        <div className="w-full" {...getRootProps()}>
            <motion.div
                onClick={HandleClick}
                whileHover="animate"
                className="p-10 group/file block rounded-lg cursor-pointer w-full relative overflow-hidden"
            >
                <input
                    ref={fileInputRef}
                    id="file-upload-handle"
                    type="file"
                    onChange={(e) => HandleFileChange(Array.from(e.target.files || []))}
                    className="hidden"
                />
                <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
                    <GridPattern />
                </div>
                <div className="flex flex-col items-center justify-center">
                    <p className="relative z-20 font-sans font-bold text-[#FF7F3E] text-base">
                        Upload file
                    </p>
                    <p className="relative z-20 font-sans font-normal text-[#4335A7] text-base mt-2">
                        Drag or drop .zip file here or click to upload
                    </p>
                    <div className="relative w-full mt-10 max-w-xl mx-auto bg-[#7cc2e8] rounded-md">
                        {files.length > 0 &&
                            files.map((file, idx) => (
                                <motion.div
                                    key={"file" + idx}
                                    layoutId={idx === 0 ? "file-upload" : "file-upload-" + idx}
                                    className={cn(
                                        "relative overflow-hidden z-40 bg-[#80C4E9] flex flex-col items-start justify-start md:h-24 p-4 mt-4 w-full mx-auto rounded-md",
                                        "shadow-sm"
                                    )}
                                >
                                    <div className="flex justify-between w-full items-center gap-4">
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            layout
                                            className="text-base text-[#FF7F3E] truncate max-w-xs"
                                        >
                                            {file.name}
                                        </motion.p>
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            layout
                                            className="rounded-lg px-2 py-1 w-fit flex-shrink-0 text-sm text-[#4335A7] bg-[#FFF6E9] shadow-input"
                                        >
                                            {(file.size / (1024 * 1024)).toFixed(2)} MB
                                        </motion.p>
                                    </div>

                                    <div className="flex text-sm md:flex-row flex-col items-start md:items-center w-full mt-2 justify-between text-[#4335A7]">
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            layout
                                            className="px-1 py-0.5 rounded-md bg-[#FFF6E9]"
                                        >
                                            {file.type}
                                        </motion.p>

                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            layout
                                        >
                                            modified{" "}
                                            {new Date(file.lastModified).toLocaleDateString()}
                                        </motion.p>
                                    </div>
                                </motion.div>
                            ))}
                        {!files.length && (
                            <motion.div
                                layoutId="file-upload"
                                variants={mainVariant}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 20,
                                }}
                                className={cn(
                                    "relative group-hover/file:shadow-2xl z-40 bg-[#80C4E9] flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md",
                                    "shadow-[0px_10px_50px_rgba(67,53,167,0.1)]"
                                )}
                            >
                                {isDragActive ? (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-[#FF7F3E] flex flex-col items-center"
                                    >
                                        Drop it
                                        <IconUpload className="h-4 w-4 text-[#4335A7]" />
                                    </motion.p>
                                ) : (
                                    <IconUpload className="h-4 w-4 text-[#FF7F3E]" />
                                )}
                            </motion.div>
                        )}

                        {!files.length && (
                            <motion.div
                                variants={secondaryVariant}
                                className="absolute opacity-0 border border-dashed border-[#4335A7] inset-0 z-30 bg-transparent flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md"
                            ></motion.div>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export function GridPattern() {
    const columns = 41;
    const rows = 11;
    return (
        <div className="flex bg-[#FFF6E9] flex-shrink-0 flex-wrap justify-center items-center gap-x-px gap-y-px  scale-105">
            {Array.from({ length: rows }).map((_, row) =>
                Array.from({ length: columns }).map((_, col) => {
                    const index = row * columns + col;
                    return (
                        <div
                            key={`${col}-${row}`}
                            className={`w-10 h-10 flex flex-shrink-0 rounded-[2px] ${index % 2 === 0
                                    ? "bg-[#80C4E9]"
                                    : "bg-[#80C4E9] shadow-[0px_0px_1px_3px_rgba(128,196,233,1)_inset]"
                                }`}
                        />
                    );
                })
            )}
        </div>
    );
}
