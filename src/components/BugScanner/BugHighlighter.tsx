import React, { useEffect, useRef, useState } from 'react';
import { useHighlightStore } from '@/store/highlightStore';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bug, ArrowRightLeft, FileCode } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import logo from '@/assets/logo.png';

interface BugHighlighterProps {
    id?: string;
    ids?: string[];
    children: React.ReactNode;
    className?: string;
    bugName?: string;
}

export const BugHighlighter: React.FC<BugHighlighterProps> = ({ id, ids, children, className, bugName }) => {
    const { activeHighlights, clearHighlight } = useHighlightStore();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [showCompare, setShowCompare] = useState(false);
    // Persist details locally so they remain available after clearing the store highlight
    const containerRef = useRef<HTMLDivElement>(null);

    const targetIds = ids || (id ? [id] : []);
    const activeId = targetIds.find(tid => !!activeHighlights[tid]);
    const isActive = !!activeId;



    // Primary bug detail to use for initial snapshot or single view

    // Use local details if available (dialog open), otherwise fallback to store
    // For local details, we might need to store an array if we are persisting multiple
    const [savedDetailsMap, setSavedDetailsMap] = useState<Record<string, any>>({});

    // Derived state for rendering
    // If dialog is open, we use savedDetailsMap. If not, we use activeHighlights.
    const detailsMapToRender = isDialogOpen ? savedDetailsMap : activeHighlights;
    // Filter targetIds to those that have details
    const validIds = targetIds.filter(tid => !!detailsMapToRender[tid]);

    // Single bug details for backward compatibility or single active bug
    const singleDetails = validIds.length > 0 ? detailsMapToRender[validIds[0]] : null;

    useEffect(() => {
        if (isActive && containerRef.current) {
            containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [isActive]);

    const handleClick = () => {
        if (isActive) {
            // Snapshot all current details
            const snapshot: Record<string, any> = {};
            targetIds.forEach(tid => {
                if (activeHighlights[tid]) {
                    snapshot[tid] = activeHighlights[tid];
                }
            });
            setSavedDetailsMap(snapshot);

            setIsDialogOpen(true);
            // Clear all highlights associated
            targetIds.forEach(tid => clearHighlight(tid));
        }
    };

    const renderBugContent = (details: any) => {
        if (!details) return null;
        return (
            <div className="mt-4 space-y-6">
                {!showCompare ? (
                    <div className="space-y-4">
                        <div className="p-4 bg-muted/50 rounded-lg border">
                            <h3 className="text-sm font-semibold mb-2 text-muted-foreground flex items-center gap-2">
                                <FileCode className="w-4 h-4" /> Source code
                            </h3>
                            <div className="bg-slate-950 text-slate-50 p-4 rounded-md font-mono text-sm overflow-x-auto">
                                <pre>{details.originalCode || '// Code source not available'}</pre>
                            </div>
                        </div>

                        <div className="flex justify-center pt-2">
                            <Button onClick={() => setShowCompare(true)} className="gap-2">
                                <ArrowRightLeft className="w-4 h-4" /> Compare with Fix
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4 animate-in fade-in zoom-in duration-300">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Original Code */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <Badge variant="destructive" className="bg-red-500/15 text-red-600 hover:bg-red-500/25 border-0">
                                        Current Implementation
                                    </Badge>
                                </div>
                                <div className="bg-red-50/50 border border-red-100 p-4 rounded-lg h-full max-h-[500px] overflow-auto">
                                    <pre className="text-xs sm:text-sm font-mono text-red-900/80 whitespace-pre-wrap">
                                        {details.originalCode}
                                    </pre>
                                </div>
                            </div>

                            {/* Fixed Code */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <Badge variant="default" className="bg-green-500/15 text-green-600 hover:bg-green-500/25 border-0">
                                        The Bug Solution
                                    </Badge>
                                </div>
                                <div className="bg-green-50/50 border border-green-100 p-4 rounded-lg h-full max-h-[500px] overflow-auto">
                                    <pre className="text-xs sm:text-sm font-mono text-green-900/80 whitespace-pre-wrap">
                                        {details.fixedCode}
                                    </pre>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-4 border-t">
                            <Button variant="outline" onClick={() => setShowCompare(false)}>
                                Back
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <>
            <div
                ref={containerRef}
                className={`relative inline-block ${className || ''} ${isActive ? 'cursor-pointer' : ''}`}
                onClick={handleClick}
            >
                <div className={isActive ? 'highlight-pulse rounded-lg' : ''}>
                    {children}
                </div>

                {isActive && (
                    <div className="absolute -top-3 -right-3 z-50 animate-bounce">
                        <div className="bg-white p-1 rounded-full shadow-lg border border-red-100">
                            <img src={logo} alt="Bug detected" className="w-6 h-6 object-contain" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                        </div>
                    </div>
                )}
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <div className="flex items-center gap-2">
                            <Bug className="w-5 h-5 text-red-500" />
                            <DialogTitle className="text-xl">
                                {validIds.length > 1 ? "Multiple Bugs Detected" : (singleDetails?.name || bugName || 'Potential Bug Detected')}
                            </DialogTitle>
                        </div>
                        <DialogDescription>
                            {validIds.length > 1
                                ? "Multiple issues were found in this component. Please review each one."
                                : (singleDetails?.description || 'Review the detected issue and the suggested fix.')
                            }
                        </DialogDescription>
                    </DialogHeader>

                    {validIds.length > 1 ? (
                        <Tabs defaultValue={validIds[0]} className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                {validIds.map(tid => (
                                    <TabsTrigger key={tid} value={tid}>
                                        {detailsMapToRender[tid]?.name || tid}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                            {validIds.map(tid => (
                                <TabsContent key={tid} value={tid}>
                                    {renderBugContent(detailsMapToRender[tid])}
                                </TabsContent>
                            ))}
                        </Tabs>
                    ) : (
                        renderBugContent(singleDetails)
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};
