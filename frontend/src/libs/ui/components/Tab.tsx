import { useMediaQuery, useTheme, Typography } from "@mui/material";
import React, { useState } from 'react';
import colors from "../color";

interface TabProps {
    tabItems: string[];
}

const styles = (isActive: boolean, isMobile: boolean) => ({
    button: {
        display: 'flex',
        flexDirection: 'row' as 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        width: isMobile ? '100px' : '200px',
        height: '32px',
        padding: '8px 16px',
        backgroundColor: 'transparent',
        color: isActive ? colors.orange500 : colors.black100,
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        position: 'relative' as 'relative',
        alignSelf: isMobile ? 'stretch' : undefined,
    },
    line: {
        position: 'absolute' as 'absolute',
        bottom: '-16px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        height: '2px',
        backgroundColor: isActive ? colors.orange500 : 'transparent',
    },
});

export const Tab: React.FC<TabProps> = ({ tabItems }) => {
    const [activeTab, setActiveTab] = useState(0);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <div style={{ marginTop: '32px', marginBottom: '32px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '8px', position: 'relative' }}>
            {tabItems.map((item, index) => {
                const isActive = activeTab === index;
                const buttonStyles = styles(isActive, isMobile);
                return (
                    <button
                        key={index}
                        onClick={() => setActiveTab(index)}
                        style={buttonStyles.button}
                    >
                        <Typography variant={isMobile ? "body2" : "h5"}>{item}</Typography>
                        <div style={buttonStyles.line} />
                    </button>
                );
            })}
            <div>
            </div>
        </div>
    );
}