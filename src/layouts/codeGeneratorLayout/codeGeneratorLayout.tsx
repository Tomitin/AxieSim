import Typography from '@mui/material/Typography';
import React, { ReactNode } from 'react';
import './codeGeneratorLayout.css';

interface CodeGeneratorProps {
    name: string;
    children: ReactNode;
}

const CodeGeneratorLayout: React.FunctionComponent<CodeGeneratorProps> = (props: CodeGeneratorProps): JSX.Element => {
    return (
        <div className="code-generator">
            <div className="title-container">
                <Typography align="center" variant="h4" component="h1">
                    {props.name}
                </Typography>
            </div>
            <div className="content-container">{props.children}</div>
        </div>
    );
};

export default CodeGeneratorLayout;
