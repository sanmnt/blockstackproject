// src/components/PublicUrlRegistrar.jsx
import React from 'react';
import { Text } from '@blockstack/ui';
import { useConnect } from '@stacks/connect-react';
import { bufferCVFromString } from '@stacks/transactions';
import { CONTRACT_ADDRESS, CONTRACT_NAME } from '../assets/constants';


export const PublicUrlRegistrar = ({ userSession }) => {
    const { doContractCall } = useConnect();
    const { username } = userSession.loadUserData();
    const url = `${document.location.origin}/todos/${username}`;

    const register = () =>
        // do the contract call
        doContractCall({
            contractAddress: CONTRACT_ADDRESS,
            contractName: CONTRACT_NAME,
            functionName: 'register',
            functionArgs: [bufferCVFromString(username), bufferCVFromString(url)],
            finished: data => {
                console.log({data});
            },
        });

    return (
        <>
            <Text
                color="blue"
                cursor="pointer"
                fontSize={1}
                fontWeight="500"
                onClick={() => {
                    // register the public URL
                     register();
                }}
            >
                Register on-chain
            </Text>
        </>
    );
};