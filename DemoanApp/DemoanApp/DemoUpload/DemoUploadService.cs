using Azure.Storage.Blobs;
using DemoanApp.PublicModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DemoanApp.DemoUpload
{
    internal class DemoUploadService : IDemoUploadService
    {
        public Task Upload(FileUpload fileUpload)
        {
            var connectionString = GetConnectionString();
            var blobContainer = GetOrCreateBlobContainer(connectionString, "unparsed-demos");
            return UploadFile(blobContainer, fileUpload);
        }

        private async Task UploadFile(BlobContainerClient container, FileUpload fileUpload)
        {
            using (var stream = fileUpload.File.OpenReadStream())
            {
                await container.UploadBlobAsync(fileUpload.File.FileName, stream);
            }
        }

        private BlobContainerClient GetOrCreateBlobContainer(string connectionString, string containerName)
        {
            var blobServiceClient = new BlobServiceClient(connectionString);
            var container = blobServiceClient.GetBlobContainerClient(containerName);
            container.CreateIfNotExists();
            return container;
        }

        // Retrieve the connection string for use with the application. The storage
        // connection string is stored in an environment variable on the machine
        // running the application called AZURE_STORAGE_CONNECTION_STRING. If the
        // environment variable is created after the application is launched in a
        // console or with Visual Studio, the shell or application needs to be closed
        // and reloaded to take the environment variable into account.
        private string GetConnectionString()
        {
            return Environment.GetEnvironmentVariable("AZURE_STORAGE_CONNECTION_STRING");
        }
    }
}
