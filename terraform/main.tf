provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "main" {
  name     = "${var.prefix}-resources"
  location = var.location
}

resource "azurerm_app_service_plan" "main" {
  name                = "${var.prefix}-asp"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  kind                = "Linux"
  reserved            = true

  sku {
    tier = "Free"
    size = "F1"
  }
  
  depends_on = [azurerm_app_service_plan.func]
}

resource "azurerm_cosmosdb_account" "db" {
  name                = "${var.prefix}-cosmosdb"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  offer_type          = "Standard"
  kind                = "GlobalDocumentDB"
  enable_free_tier    = true

  consistency_policy {
    consistency_level       = "Eventual"
    max_interval_in_seconds = 10
    max_staleness_prefix    = 200
  }

  geo_location {
    location          = azurerm_resource_group.main.location
    failover_priority = 0
  }
}

resource "azurerm_storage_account" "main" {
  name                     = "demoanstorageacc"
  resource_group_name      = azurerm_resource_group.main.name
  location                 = azurerm_resource_group.main.location
  account_tier             = "Standard"
  access_tier              = "Cool"
  account_replication_type = "LRS"
}

resource "azurerm_storage_container" "main" {
  name                  = "unparsed-demos"
  storage_account_name  = azurerm_storage_account.main.name
  container_access_type = "private"
}

locals {
  cosmos = {
    name  = "AZURE_COSMOS_CONNECTION_STRING"
    value = "DefaultEndpointsProtocol=https;AccountEndpoint=${azurerm_cosmosdb_account.db.endpoint};AccountKey=${azurerm_cosmosdb_account.db.primary_master_key};"
  }
  storage_account = {
    name  = "AZURE_STORAGE_CONNECTION_STRING"
    value = azurerm_storage_account.main.primary_blob_connection_string
  }
}

resource "azurerm_app_service" "main" {
  name                = "${var.prefix}-app"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  app_service_plan_id = azurerm_app_service_plan.main.id

  site_config {
    use_32_bit_worker_process = true
    linux_fx_version          = "NODE|14-lts"
    app_command_line          = "node output/dist/main.js"
  }

  connection_string {
    name  = local.cosmos.name
    type  = "Custom"
    value = local.cosmos.value
  }

  connection_string {
    name  = local.storage_account.name
    type  = "Custom"
    value = local.storage_account.value
  }
}

resource "azurerm_app_service_plan" "func" {
  name                = "${var.prefix}-func-asp"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  kind                = "FunctionApp"
  reserved            = true

  sku {
    tier = "Dynamic"
    size = "Y1"
  }
}

resource "azurerm_function_app" "main" {
  name                       = "${var.prefix}-func"
  location                   = azurerm_resource_group.main.location
  resource_group_name        = azurerm_resource_group.main.name
  app_service_plan_id        = azurerm_app_service_plan.func.id
  storage_account_name       = azurerm_storage_account.main.name
  storage_account_access_key = azurerm_storage_account.main.primary_access_key
  os_type                    = "linux"
  version                    = "~3"

  site_config {
    use_32_bit_worker_process = true
    linux_fx_version          = "NODE|14-lts"
  }

  connection_string {
    name  = local.cosmos.name
    type  = "Custom"
    value = local.cosmos.value
  }

  connection_string {
    name  = local.storage_account.name
    type  = "Custom"
    value = local.storage_account.value
  }
}
