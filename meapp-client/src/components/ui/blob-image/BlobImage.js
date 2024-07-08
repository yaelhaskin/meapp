import React from 'react';
import { useQuery } from 'react-query';

import { getBlob } from "../../../data/requests"

const BlobImage = ({ blobName, className }) => {
    const { data: blobData, error: blobError, isLoading: blobLoading } = useQuery({
        queryKey: ['blob', blobName],
        queryFn: () => getBlob(blobName),
    });

    if (blobLoading) return <div>Loading...</div>;
    if (blobError) return <div>Error: {blobError.message}</div>;
    
    return (
        <div>
          <img src={blobData} alt={blobName} className={className}/>
        </div>
    );
};

export default BlobImage;



