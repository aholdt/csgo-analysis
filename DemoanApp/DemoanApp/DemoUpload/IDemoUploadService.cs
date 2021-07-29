using DemoanApp.PublicModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DemoanApp.DemoUpload
{
    public interface IDemoUploadService
    {
        Task Upload(FileUpload fileUpload);
    }
}
