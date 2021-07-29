﻿using DemoanApp.DemoUpload;
using DemoanApp.PublicModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DemoanApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FileController : ControllerBase
    {
        private readonly IDemoUploadService demoUploadService;

        public FileController(IDemoUploadService demoUploadService)
        {
            this.demoUploadService = demoUploadService;
        }

        [HttpPost]
        public Task UploadDemo([FromForm] FileUpload fileUpload)
        {
            return demoUploadService.Upload(fileUpload);
        }
    }
}
