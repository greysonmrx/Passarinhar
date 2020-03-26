import React, { useState, useEffect, useRef } from 'react';
import { useField } from '@rocketseat/unform';
import api from '../../services/api';

import {
    Container
} from './styles';

export default function ImageField({ setImage, src }) {
    const [file, setFile] = useState();
    const [preview, setPreview] = useState(src);

    const ref = useRef();

    async function handleChange(e) {
        const data = new FormData();

        data.append('file', e.target.files[0]);

        const response = await api.post('files', data);

        const { id, url } = response.data;

        setFile(id);
        setPreview(url);

        setImage(id);
    }

    return (
        <Container>
            <label htmlFor='image'>
                <img src={
                    preview || 'http://www.tudodesenhos.com/uploads/images/15001/silhueta-de-homem-musculoso.gif'
                } alt=''/>
                <input 
                    type='file'
                    id='image'
                    accept='image/*'
                    data-file={file}
                    onChange={handleChange}
                    ref={ref}
                />
            </label>
        </Container>
    );
}