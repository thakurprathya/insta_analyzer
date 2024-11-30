import { JSZipObject } from 'jszip';

interface OutputData {
    [key: string]: string[];
}

function ExtractLinks(htmlContent: string): string[] {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const links: HTMLCollectionOf<HTMLAnchorElement> = doc.getElementsByTagName('a');
    const hrefs: string[] = [];
    
    for (let link of links) {
        const href = link.getAttribute('href');
        if (href) hrefs.push(href);
    }
    return hrefs;
}

async function ProcessFiles(files: JSZipObject[]): Promise<OutputData> {
    const output: OutputData = {};

    await Promise.all(files.map(async (file) => {
        const filename = file.name.split('/').pop()?.replace('.html', '') || '';
        if (file.name.endsWith('.html')) {
            try {
                const content = await file.async('text');
                output[filename] = ExtractLinks(content);
            } catch (error) {
                console.error(`Error processing file ${filename}:`, error);
            }
        }
    }));

    const followers: Set<string> = new Set(output['followers_1'] || []);
    const following: Set<string> = new Set(output['following'] || []);
    
    const notFollowingBack: string[] = [...following].filter(link => !followers.has(link));
    output.not_following_back = notFollowingBack;
    
    return output;
}

export { ProcessFiles, type OutputData };