import { Client, ID, Databases, Query, Storage } from "appwrite";
import config from "../../config";
import notify from "../Toast/Toast";

class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(config.appwrite_url)
      .setProject(config.appwrite_projectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      const post = await this.databases.createDocument(
        config.appwrtie_db_id,
        config.appwrtie_collection_id,
        slug,
        { title, content, featuredImage, status, userId, slug }
      );
      return post;
    } catch (error) {
      notify.ErrorToast(`Error line: ${error}`);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      const post = await this.databases.updateDocument(
        config.appwrtie_db_id,
        config.appwrtie_collection_id,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
      return post;
    } catch (error) {
      notify.ErrorToast(`Error: ${error}`);
    }
  }

  async deletePost(slug) {
    try {
      const post = await this.databases.deleteDocument(
        config.appwrtie_db_id,
        config.appwrtie_collection_id,
        slug
      );
      if (post) {
        return true;
      }
    } catch (error) {
      notify.ErrorToast(`Error: ${error}`);
    }
  }

  async getPost(slug) {
    try {
      const post = await this.databases.getDocument(
        config.appwrtie_db_id,
        config.appwrtie_collection_id,
        slug
      );
      return post;
    } catch (error) {
      notify.ErrorToast(`Error: ${error}`);
    }
  }

  async listPosts(queries = [Query.equal("status", "active")]) {
    try {
      const posts = await this.databases.listDocuments(
        config.appwrtie_db_id,
        config.appwrtie_collection_id,
        [...queries]
      );
      return posts;
    } catch (error) {
      notify.ErrorToast(`Error: ${error}`);
    }
  }

  //   file Upload Serivice

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        config.appwrtie_bucket_id,
        ID.unique(),
        file
      );
    } catch (error) {
      notify.ErrorToast(`Error: ${error}`);
    }
  }

  async deleteFile(file_id) {
    try {
      return await this.bucket.deleteFile(config.appwrtie_bucket_id, file_id);
    } catch (error) {
      notify.ErrorToast(`Error: ${error}`);
    }
  }

  getFilePreview(file_id){
    return this.bucket.getFilePreview(
        config.appwrtie_bucket_id,
        file_id
    )
  }


}

const appwriteConfig = new Service();

export default appwriteConfig;
