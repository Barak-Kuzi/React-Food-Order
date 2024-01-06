import React, {useState, SetStateAction, useEffect, useCallback} from "react";

async function sendHttpRequest(url: string, config: any) {
    const response = await fetch(url, config);
    const resData = await response.json();

    if (!response.ok) {
        throw new Error(resData.message || 'Something went wrong, failed to send request.');
    }

    return resData;
}

export default function useHttp(url: string, config: any, initialData?: any) {
    const [fetchedData, setFetchedData]
        = useState(initialData);
    const [isFetching, setIsFetching]: [boolean, React.Dispatch<SetStateAction<boolean>>]
        = useState(false);
    const [errorState, setErrorState]: [string, React.Dispatch<SetStateAction<string>>]
        = useState('');

    function clearData() {
        setFetchedData(initialData);
    }

    const sendRequest = useCallback(async function sendRequest(data?: any) {
        setIsFetching(true);
        try {
            const resData = await sendHttpRequest(url, {...config, body: data});
            setFetchedData(resData);
        } catch (error: any) {
            setErrorState(error.message || 'Something went wrong!');
        }
        setIsFetching(false);
    }, [url, config]);

    useEffect(() => {
        if (config.method === 'GET') {
            sendRequest();
        }
    }, [sendRequest, config.method]);

    return {
        fetchedData,
        isFetching,
        errorState,
        sendRequest,
        clearData
    }
}