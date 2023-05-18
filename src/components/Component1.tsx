import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

// Interface for the JSON data
interface Post {
    id: number;
    title: string;
    body: string;
}

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'body', headerName: 'Body', width: 400 },
];

const Component1 = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
                setPosts(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div style={{ height: 500, width: '100%',marginBottom:'40px' }}>
            <DataGrid rows={posts} columns={columns}  />
        </div>
    );
};

export default Component1;
