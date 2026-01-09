import { Editor } from '@tinymce/tinymce-react';
import { forwardRef, useMemo } from 'react';

interface ContentEditorProps {
    value: string;
    onChange: (content: string) => void;
    imageHandler?: (blobInfo: any) => Promise<string>;
    useDarkMode: boolean;
    isSmallScreen: boolean;
    error?: string;
}

export const ContentEditor = forwardRef<any, ContentEditorProps>(({ value, onChange, imageHandler, useDarkMode, isSmallScreen, error }, ref) => {
    const tinymceInit = useMemo(
        () => ({
            // Karena menggunakan plugin 'autoresize', kita gunakan min dan max height
            min_height: isSmallScreen ? 400 : 600,
            max_height: isSmallScreen ? 700 : 1000,
            autoresize_bottom_margin: 20,

            plugins: ['accordion', 'advlist', 'anchor', 'autolink', 'autoresize', 'charmap', 'code', 'codesample', 'directionality', 'emoticons', 'fullscreen', 'help', 'image', 'importcss', 'insertdatetime', 'link', 'lists', 'media', 'nonbreaking', 'pagebreak', 'preview', 'quickbars', 'save', 'searchreplace', 'table', 'visualblocks', 'visualchars', 'wordcount'],

            toolbar: 'fullscreen | undo redo | blocks | bold italic strikethrough | align numlist bullist | link image media table mergetags | preview | code help',

            // Konfigurasi Image Upload
            images_upload_handler: imageHandler
                ? async (blobInfo: any) => {
                      try {
                          const url = await imageHandler(blobInfo);
                          return url;
                      } catch (error) {
                          throw new Error('Upload failed');
                      }
                  }
                : undefined,

            // Styling & Dark Mode
            skin: useDarkMode ? 'oxide-dark' : 'oxide',
            content_css: useDarkMode ? 'dark' : 'default',
            content_style: `
                body {
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                    font-size: 16px;
                    line-height: 1.6;
                }
                img { max-width: 100%; height: auto; border-radius: 8px; }
            `,

            // Branding & Interface
            branding: false,
            promotion: false,
            elementpath: false,
            menubar: true,
        }),
        [imageHandler, useDarkMode, isSmallScreen],
    );

    return (
        <div className={`overflow-hidden rounded-lg border transition-all ${error ? 'border-red-500 ring-1 ring-red-500' : 'border-input focus-within:ring-1 focus-within:ring-ring'}`}>
            <Editor
                apiKey="0rl4abq6pz1sf2afw9izxs2pxqr7jbh970rxtxb8r85zwil4"
                onInit={(_evt, editor) => {
                    if (ref) {
                        (ref as any).current = editor;
                    }
                }}
                value={value || ''}
                onEditorChange={(newValue) => onChange(newValue)}
                init={tinymceInit as any}
            />
        </div>
    );
});

ContentEditor.displayName = 'ContentEditor';
