import React from 'react';

interface RawHtmlProps {
    html: string;
    className?: string;
    as?: React.ElementType;
}

/**
 * Renders raw HTML content.
 * WARNING: This bypasses React's XSS protection. Ensure the content is trusted or sanitized!
 * 
 * Usage:
 * <RawHtml html="<strong>Bold Text</strong>" />
 */
const RawHtml: React.FC<RawHtmlProps> = ({ html, className, as: Component = 'div' }) => {
    return (
        <Component
            className={className}
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
};

export default RawHtml;
