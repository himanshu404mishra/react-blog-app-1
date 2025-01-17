const config = {
    appwrite_url:String(import.meta.env.VITE_APPWRITE_URL),
    appwrite_projectId:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwrtie_db_id:String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwrtie_collection_id:String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwrtie_bucket_id:String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    tinymce_apikey:String(import.meta.env.VITE_TINYMCE_API_KEY)
}

export default config