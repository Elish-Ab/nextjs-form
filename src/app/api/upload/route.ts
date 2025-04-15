import { Dropbox } from "dropbox";
import { NextResponse } from "next/server";

// Initialize Dropbox client with fetch
const dbx = new Dropbox({ 
  accessToken: process.env.DROPBOX_ACCESS_TOKEN,
  fetch: fetch // Explicitly pass the fetch function
});

export async function POST(request: Request) {
  try {
    // Log the request
    console.log("Received upload request");

    // Parse the request body
    let body;
    try {
      body = await request.json();
      console.log("Request body parsed successfully");
    } catch (error) {
      console.error("Failed to parse request body:", error);
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    const { file, filename, folder } = body;

    // Log the received data (without the file content for brevity)
    console.log("Received upload request for:", { 
      filename, 
      folder,
      hasFileData: !!file,
      fileDataLength: file ? file.length : 0
    });

    // Validate input
    if (!file) {
      console.error("Missing file data");
      return NextResponse.json(
        { error: "File data is required" },
        { status: 400 }
      );
    }

    if (!filename) {
      console.error("Missing filename");
      return NextResponse.json(
        { error: "Filename is required" },
        { status: 400 }
      );
    }

    // Check if Dropbox token is available
    const hasDropboxToken = !!process.env.DROPBOX_ACCESS_TOKEN && process.env.DROPBOX_ACCESS_TOKEN !== 'your_dropbox_access_token_here';
    
    if (!hasDropboxToken) {
      console.warn("Dropbox access token is not configured or is using the placeholder value");
      
      // Return a mock response for development/testing
      return NextResponse.json({ 
        fileUrl: `https://example.com/mock-${folder || 'uploads'}/${filename}`,
        path: `/${folder || 'uploads'}/${filename}`,
        isMock: true
      });
    }

    // Convert base64 to buffer
    let buffer: Buffer;
    try {
      // Check if the file data is already a base64 string
      if (typeof file === 'string') {
        // If it's a data URL, extract the base64 part
        if (file.includes('data:')) {
          const base64Data = file.split(',')[1];
          buffer = Buffer.from(base64Data, 'base64');
        } else {
          // Assume it's already a base64 string
          buffer = Buffer.from(file, 'base64');
        }
      } else {
        console.error("File data is not a string:", typeof file);
        return NextResponse.json(
          { error: "File data must be a base64 string" },
          { status: 400 }
        );
      }

      if (buffer.length === 0) {
        throw new Error("Empty buffer created from base64 data");
      }
      
      console.log("Successfully converted file to buffer, size:", buffer.length);
    } catch (error) {
      console.error("Failed to convert base64 to buffer:", error);
      return NextResponse.json(
        { error: "Invalid file data", details: error instanceof Error ? error.message : String(error) },
        { status: 400 }
      );
    }

    // Create a unique filename to avoid conflicts
    const uniqueFilename = `${Date.now()}-${filename}`;
    const path = `/${folder || 'uploads'}/${uniqueFilename}`;

    console.log("Attempting to upload to Dropbox:", { path, fileSize: buffer.length });

    // Upload file to Dropbox
    let uploadResponse;
    try {
      uploadResponse = await dbx.filesUpload({
        path,
        contents: buffer,
        mode: { '.tag': 'add' },
        autorename: true,
        mute: false,
        strict_conflict: false
      });
      console.log("File uploaded successfully:", uploadResponse.result);
    } catch (error: any) {
      console.error("Dropbox upload error:", error);
      return NextResponse.json(
        { 
          error: "Failed to upload to Dropbox",
          details: error.error?.error_summary || error.message
        },
        { status: 500 }
      );
    }

    // Generate temporary direct download link
    let downloadLinkResponse;
    try {
      downloadLinkResponse = await dbx.filesGetTemporaryLink({
        path: uploadResponse.result.path_lower || path
      });
      console.log("Download link created successfully:", downloadLinkResponse.result);
    } catch (error: any) {
      console.error("Failed to create download link:", error);
      return NextResponse.json(
        { 
          error: "Failed to create download link",
          details: error.error?.error_summary || error.message
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      fileUrl: downloadLinkResponse.result.link,
      path: uploadResponse.result.path_lower || path
    });
  } catch (error: any) {
    console.error("Unexpected error in upload route:", error);
    
    // Log the specific error details
    if (error.error) {
      console.error("Dropbox API error:", error.error);
    }
    
    return NextResponse.json(
      { 
        error: "Upload failed",
        details: error.message || error.error?.error_summary || "Unknown error"
      },
      { status: 500 }
    );
  }
} 