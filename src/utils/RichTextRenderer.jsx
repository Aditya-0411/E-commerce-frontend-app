// src/utils/RichTextRenderer.jsx
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Typography, Box, Divider } from '@mui/material';
import remarkGfm from 'remark-gfm'; // For tables, strikethroughs, etc.

const RichTextRenderer = ({ content }) => {
    return (
        <ReactMarkdown
            children={content}
            remarkPlugins={[remarkGfm]} // Essential for good markdown support
            components={{
                // H1 from markdown (# Title)
                h1: ({ node, ...props }) => <Typography variant="h4" component="h2" mt={3} mb={1} {...props} />,
                // H2 from markdown (## Subtitle)
                h2: ({ node, ...props }) => <Typography variant="h5" component="h3" mt={4} mb={1} {...props} sx={{ borderBottom: '1px solid #eee', pb: 0.5 }} />,
                // H3 from markdown (### Section)
                h3: ({ node, ...props }) => <Typography variant="h6" component="h4" mt={3} {...props} />,
                // Paragraphs
                p: ({ node, ...props }) => <Typography variant="body1" component="p" mb={2} {...props} />,
                // Lists
                ul: ({ node, ...props }) => <Box component="ul" sx={{ listStyleType: 'disc', pl: 4, mb: 2 }} {...props} />,
                ol: ({ node, ...props }) => <Box component="ol" sx={{ listStyleType: 'decimal', pl: 4, mb: 2 }} {...props} />,
                li: ({ node, ...props }) => <Box component="li" sx={{ mb: 1 }} {...props} />,
                // Horizontal Rule
                hr: ({ node, ...props }) => <Divider sx={{ my: 3 }} {...props} />,
                // Links
                a: ({ node, ...props }) => <a target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', fontWeight: 500 }} {...props} />,
                // Strong/Bold
                strong: ({ node, ...props }) => <Typography component="strong" fontWeight={700} {...props} />,
                // Add support for other elements like tables, blockquotes, etc. as needed
            }}
        />
    );
};

export default RichTextRenderer;