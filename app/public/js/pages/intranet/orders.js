(function($, window, document) {

    //-------------------------------------------------------------------------
    // Document Ready Section:
    //-------------------------------------------------------------------------
    $(function () 
    {
        //---------------------------------------------------------------------
        // Material Design
        //---------------------------------------------------------------------
        $.material.init();

        //---------------------------------------------------------------------
        // Extensions:
        //---------------------------------------------------------------------
        PageFunctions.extendAnimateCSS();


        //---------------------------------------------------------------------
        // Event Handler Methods Section:
        //---------------------------------------------------------------------
        // Order Options:
        //---------------------------------------------------------------------
        $(".cmdVehicleOptions").click(function() {
            PageFunctions.destroyAlbum();
        });
        
        //---------------------------------------------------------------------
        $("#cmdShowAlbum").click(function() {
            PageFunctions.createAlbum();
        });

        //---------------------------------------------------------------------
        // Upload Quote:
        //---------------------------------------------------------------------
        $("#cmdOpenUploadQuoteDialog").click(function() {
            PageFunctions.beforeUploadQuote();
        });

        //---------------------------------------------------------------------
        $('#quotePDF').change(function() {
            PageFunctions.validateQuotePDF();
        });

        //---------------------------------------------------------------------
        $("#cmdUploadQuote").click(function() {
            PageFunctions.uploadQuote();
        });

        //---------------------------------------------------------------------
        // Upload Invoice:
        //---------------------------------------------------------------------
        $("#cmdOpenUploadInvoiceDialog").click(function() {
            PageFunctions.beforeUploadInvoice();
        });

        //---------------------------------------------------------------------
        $('#invoicePDF').change(function() {
            PageFunctions.validateInvoicePDF();
        });

        //---------------------------------------------------------------------
        $("#cmdUploadInvoice").click(function() {
            PageFunctions.uploadInvoice();
        });

        //---------------------------------------------------------------------
        // Load Data:
        //---------------------------------------------------------------------
        PageFunctions.getCustomers();

    });

    //-------------------------------------------------------------------------
    // App Code:
    //-------------------------------------------------------------------------
    var PageFunctions = {

        //---------------------------------------------------------------------
        // Data:
        //---------------------------------------------------------------------
        customers              : null,
        currentCustomer        : null,
        ordersData             : null,
        currentOrder           : null,
        orderSatisfaction      : 50,
        orderSatisfactionIndex : 3, 

        //---------------------------------------------------------------------
        // Extensions
        //---------------------------------------------------------------------
        extendAnimateCSS: function() {
            $.fn.extend({
                animateCss: function (animationName, cb) {
                    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
                    this.addClass('animated ' + animationName).one(animationEnd, function() {
                        $(this).removeClass('animated ' + animationName);
                        if (cb) { cb(); }
                    });
                }
            });
        },

        //---------------------------------------------------------------------
        // Data Binding
        //---------------------------------------------------------------------
        getCustomers: function() {
            var sUrl       = "/get-customers/";

            $.ajax({
                    url     : sUrl,
                    method  : 'GET',
                    context : document.body
            })
            .success(function(data) {
                PageFunctions.customers = data;
                PageFunctions.currentCustomer = PageFunctions.customers[0];
                PageFunctions.loadCustomersDropdown(data);
                PageFunctions.getInitialCustomerData(data[0]["customer-id"]);
            })
            .error(function(error) {
                console.log(error);
            });
        },

        //---------------------------------------------------------------------
        loadCustomersDropdown : function(customers) {
            Handlebars.Binding.default  = Handlebars;
            var customersContext  = { "customers": customers, "firstCustomer": customers[0] };
            var customersSource   = $("#hbs-customers-filter").html();
            var customersTemplate = Handlebars.compile(customersSource);
            var customers         = customersTemplate(customersContext);
            $('.hbs-customers-filter-container').append(customers);
        },

        //---------------------------------------------------------------------
        getInitialCustomerData: function(customerId) {
            var sActionUrl = "/get-customer-orders/";
            var sUrl       = sActionUrl + customerId;

            $.ajax({
                    url     : sUrl,
                    method  : 'GET',
                    context : document.body
            })
            .success(function(data) {
                ordersData   = data;
                currentOrder = ((ordersData.orders.length > 0) ? ordersData.orders[0] : {});
                PageFunctions.displayData();
                PageFunctions.registerDataEventHandlers();
                PageFunctions.setState("dataLoaded");
            })
            .error(function(error) {
                console.log(error);
            });
        },

        //---------------------------------------------------------------------
        getCustomerData: function(customerId) {

            PageFunctions.currentCustomer = _.find(PageFunctions.customers, function(customer) { 
                    return (customer["customer-id"] === customerId.toString());
            });
            $("#cbCustomerActive").text(PageFunctions.currentCustomer.name);
                
            var sActionUrl = "/get-customer-orders/";
            var sUrl       = sActionUrl + customerId;

            $.ajax({
                    url     : sUrl,
                    method  : 'GET',
                    context : document.body
            })
            .success(function(data) {
                ordersData   = data;
                currentOrder = ((ordersData.orders.length > 0) ? ordersData.orders[0] : {});
                PageFunctions.reloadCustomerData();
                PageFunctions.reloadMasterTable();
                PageFunctions.rebind();
                PageFunctions.registerDataEventHandlers();             
            })
            .error(function(error) {
                console.log(error);
            });
        },

        //---------------------------------------------------------------------
        displayData: function() {

            // Register Handlebars Plugin
            Handlebars.Binding.default  = Handlebars;

            // Declare Data Contexts
            var tableDataContext        = { "orders" : ordersData.orders};
            var vehicleDataContext      = currentOrder.vehicle;
            var vehicleCheckContext     = { "checks" : currentOrder.checks };
            var optionsContext          = currentOrder;

            // Get Source HTML from Script Sections (Templates)
            var headerSource            = $("#hbs-header").html();
            var buttonsSource           = $("#hbs-buttons").html();
            var filterSource            = $("#hbs-orders-filter").html();
            var tableSource             = $("#hbs-table").html();
            var vehicleDataSource       = $("#hbs-vehicle-data").html();
            var vehicleCheckSource      = $("#hbs-vehicle-check").html();
            var optionsSource           = $("#hbs-options").html();

            // Get Compiled Templates
            var headerTemplate          = Handlebars.compile(headerSource);
            var buttonsTemplate         = Handlebars.compile(buttonsSource);
            var filterTemplate          = Handlebars.compile(filterSource);
            var tableTemplate           = Handlebars.compile(tableSource);
            var vehicleDataTemplate     = Handlebars.compile(vehicleDataSource);
            var vehicleCheckTemplate    = Handlebars.compile(vehicleCheckSource);
            var optionsTemplate         = Handlebars.compile(optionsSource);
            

            // Get Compiled HTML
            var header                  = headerTemplate(PageFunctions.currentCustomer);
            var buttons                 = buttonsTemplate();
            var filter                  = filterTemplate();
            var table                   = Handlebars.parseHTML(tableTemplate(tableDataContext));
            var vehicleData             = Handlebars.parseHTML(vehicleDataTemplate(vehicleDataContext));
            var vehicleCheck            = vehicleCheckTemplate(vehicleCheckContext);
            var options                 = optionsTemplate(optionsContext);

            // Insert HTML into Sections
            $('.hbs-header-container').append(header);
            $('.hbs-buttons-container').append(buttons);
            $('.hbs-orders-filter-container').append(filter);
            $('.hbs-table-container').append(table);
            $('.hbs-vehicle-data-container').append(vehicleData);
            $('.hbs-vehicle-check-container').append(vehicleCheck);
            $('.hbs-options-container').append(options);

            if (currentOrder["docs-from-client"])
            {
                var docHistoryContext       = { "docs" : currentOrder["docs-from-client"] };
                var docHistorySource        = $("#hbs-dochistory").html();
                var docHistoryTemplate      = Handlebars.compile(docHistorySource);
                var docHistory              = docHistoryTemplate(docHistoryContext);
                $(".hbs-dochistory-container").append(docHistory);
            }


            Handlebars.update();
        },

        //---------------------------------------------------------------------
        reloadCustomerData: function() {
            var headerDataContext       = PageFunctions.currentCustomer;
            var headerSource            = $("#hbs-header").html();
            var headerTemplate          = Handlebars.compile(headerSource);
            var header                  = Handlebars.parseHTML(headerTemplate(headerDataContext));
            
            $('.hbs-header-container').html(header);

            Handlebars.update();
        },


        //---------------------------------------------------------------------
        reloadMasterTable: function() {
            var tableDataContext        = { "orders" : ordersData.orders};
            var tableSource             = $("#hbs-table").html();
            var tableTemplate           = Handlebars.compile(tableSource);
            var table                   = Handlebars.parseHTML(tableTemplate(tableDataContext));
            
            $('.hbs-table-container').html(table);

            Handlebars.update();
        },

        //---------------------------------------------------------------------
        registerDataEventHandlers: function() {
            $("#master-table tr").click(function() {
                currentOrder = ordersData.orders[($(this).index())];
                PageFunctions.rebind();
                Handlebars.update();
            });
        },

        //---------------------------------------------------------------------
        rebind: function() {
            // Vehicle Data/Check
            var vehicleDataContext      = currentOrder.vehicle;
            vehicleDataContext.plates   = currentOrder.plates;
            vehicleDataContext.service  = currentOrder["service-requested"];
            vehicleDataContext.price    = currentOrder["price-without-tax"];

            var vehicleDataSource       = $("#hbs-vehicle-data").html();
            var vehicleDataTemplate     = Handlebars.compile(vehicleDataSource);
            var vehicleData             = Handlebars.parseHTML(vehicleDataTemplate(vehicleDataContext));
            $('.hbs-vehicle-data-container').html(vehicleData);

            // Order Options
            var optionsContext          = currentOrder;
            var optionsSource           = $("#hbs-options").html();
            var optionsTemplate         = Handlebars.compile(optionsSource);
            var options                 = optionsTemplate(optionsContext);
            $('.hbs-options-container').html(options);

            // Doc History
            if (currentOrder["docs-from-client"])
            {
                var docHistoryContext       = { "docs" : currentOrder["docs-from-client"] };
                var docHistorySource        = $("#hbs-dochistory").html();
                var docHistoryTemplate      = Handlebars.compile(docHistorySource);
                var docHistory              = docHistoryTemplate(docHistoryContext);
                $("#hbs-dochistory-container").html(docHistory);
            }
        },

        //---------------------------------------------------------------------
        filterOrders: function(value) {
            var selected = "En Proceso";
            switch (value)
            {
                case 0:
                    selected = "Todas";
                    $('#master-table>tbody>tr.pending-ppto'          ).css("display", "table-row");
                    $('#master-table>tbody>tr.pending-approval'      ).css("display", "table-row");
                    $('#master-table>tbody>tr.in-process-ok'         ).css("display", "table-row");
                    $('#master-table>tbody>tr.in-process-delayed'    ).css("display", "table-row");
                    $('#master-table>tbody>tr.pending-invoice'       ).css("display", "table-row");
                    $('#master-table>tbody>tr.pending-invoice-review').css("display", "table-row");
                    $('#master-table>tbody>tr.finished'              ).css("display", "table-row");
                    break;
                case 1:
                    selected = "Pendiente PPTO";
                    $('#master-table>tbody>tr.pending-ppto'          ).css("display", "table-row");
                    $('#master-table>tbody>tr.pending-approval'      ).css("display", "none");
                    $('#master-table>tbody>tr.in-process-ok'         ).css("display", "none");
                    $('#master-table>tbody>tr.in-process-delayed'    ).css("display", "none");
                    $('#master-table>tbody>tr.pending-invoice'       ).css("display", "none");
                    $('#master-table>tbody>tr.pending-invoice-review').css("display", "none");
                    $('#master-table>tbody>tr.finished'              ).css("display", "none");
                    break;
                case 2:
                    selected = "Por Autorizar";
                    $('#master-table>tbody>tr.pending-ppto'          ).css("display", "none");
                    $('#master-table>tbody>tr.pending-approval'      ).css("display", "table-row");
                    $('#master-table>tbody>tr.in-process-ok'         ).css("display", "none");
                    $('#master-table>tbody>tr.in-process-delayed'    ).css("display", "none");
                    $('#master-table>tbody>tr.pending-invoice'       ).css("display", "none");
                    $('#master-table>tbody>tr.pending-invoice-review').css("display", "none");
                    $('#master-table>tbody>tr.finished'              ).css("display", "none");
                    break;
                case 3:
                    selected = "En Proceso";
                    $('#master-table>tbody>tr.pending-ppto'          ).css("display", "none");
                    $('#master-table>tbody>tr.pending-approval'      ).css("display", "none");
                    $('#master-table>tbody>tr.in-process-ok'         ).css("display", "table-row");
                    $('#master-table>tbody>tr.in-process-delayed'    ).css("display", "none");
                    $('#master-table>tbody>tr.pending-invoice'       ).css("display", "none");
                    $('#master-table>tbody>tr.pending-invoice-review').css("display", "none");
                    $('#master-table>tbody>tr.finished'              ).css("display", "none");
                    break;
                case 4:
                    selected = "Retrasadas";
                    $('#master-table>tbody>tr.pending-ppto'          ).css("display", "none");
                    $('#master-table>tbody>tr.pending-approval'      ).css("display", "none");
                    $('#master-table>tbody>tr.in-process-ok'         ).css("display", "none");
                    $('#master-table>tbody>tr.in-process-delayed'    ).css("display", "table-row");
                    $('#master-table>tbody>tr.pending-invoice'       ).css("display", "none");
                    $('#master-table>tbody>tr.pending-invoice-review').css("display", "none");
                    $('#master-table>tbody>tr.finished'              ).css("display", "none");
                    break;
                case 5:
                    selected = "Pendiente Factura";
                    $('#master-table>tbody>tr.pending-ppto'          ).css("display", "none");
                    $('#master-table>tbody>tr.pending-approval'      ).css("display", "none");
                    $('#master-table>tbody>tr.in-process-ok'         ).css("display", "none");
                    $('#master-table>tbody>tr.in-process-delayed'    ).css("display", "none");
                    $('#master-table>tbody>tr.pending-invoice'       ).css("display", "table-row");
                    $('#master-table>tbody>tr.pending-invoice-review').css("display", "none");
                    $('#master-table>tbody>tr.finished'              ).css("display", "none");
                    break;
                case 6:
                    selected = "Pendiente Rev. Factura";
                    $('#master-table>tbody>tr.pending-ppto'          ).css("display", "none");
                    $('#master-table>tbody>tr.pending-approval'      ).css("display", "none");
                    $('#master-table>tbody>tr.in-process-ok'         ).css("display", "none");
                    $('#master-table>tbody>tr.in-process-delayed'    ).css("display", "none");
                    $('#master-table>tbody>tr.pending-invoice'       ).css("display", "none");
                    $('#master-table>tbody>tr.pending-invoice-review').css("display", "table-row");
                    $('#master-table>tbody>tr.finished'              ).css("display", "none");
                    break;
                case 7:
                    selected = "Terminadas";
                    $('#master-table>tbody>tr.pending-ppto'          ).css("display", "none");
                    $('#master-table>tbody>tr.pending-approval'      ).css("display", "none");
                    $('#master-table>tbody>tr.in-process-ok'         ).css("display", "none");
                    $('#master-table>tbody>tr.in-process-delayed'    ).css("display", "none");
                    $('#master-table>tbody>tr.pending-invoice'       ).css("display", "none");
                    $('#master-table>tbody>tr.pending-invoice-review').css("display", "none");
                    $('#master-table>tbody>tr.finished'              ).css("display", "table-row");
                    break;
            }
            $("#cbOrdersActiveOption").text(selected);
        },

        //---------------------------------------------------------------------
        // UI / Data
        //---------------------------------------------------------------------
        createAlbum: function() {
            var pics = currentOrder["vehicle-pictures"];
            
            $("#repairPictures").nanoGallery({
                items                 : pics,
                colorSchemeViewer     : 'light',
                photoset              : 'none',
                viewerDisplayLogo     : true,
                thumbnailLazyLoad     : true,
                thumbnailLabel        : { display: true, position: 'overImageOnBottom', titleMaxLength: 35 },
                colorScheme           : { thumbnail:{ labelBackground: '#222 !important' } }, 
                locationHash          : false,
                thumbnailHoverEffect  :'borderLighter,imageScaleIn80'
            });
        },

        //---------------------------------------------------------------------
        destroyAlbum: function() {
            if ($("#repairPictures").children().length > 0)
            {
                $("#repairPictures").nanoGallery("destroy");
            }
        },
        
        //---------------------------------------------------------------------
        beforeUploadQuote: function() {
            $('#quotePDFProgress').width('0%');
            $("#frmQuotePDF")[0].reset();
            $("#uploadQuoteControlButtons").attr("disabled", true);
        },

        //---------------------------------------------------------------------
        validateQuotePDF: function() {
            var file = document.getElementById("quotePDF").files[0];
            var name = file.name;
            var size = file.size;
            var type = file.type;

            if (size > ((1024 * 1000) * 5))
            {
                PageFunctions.showSnack("Su archivo es muy grande, intente con uno menor de 5Mb.");
                $("#uploadQuoteControlButtons").attr("disabled", true);
            }

            if (type !== "application/pdf")
            {
                PageFunctions.showSnack("Su archivo debe ser formato PDF");
                $("#uploadQuoteControlButtons").attr("disabled", true);
            }

            if ((type == "application/pdf") && (size < ((1024 * 1000) * 5)))
            {
                $("#uploadQuoteControlButtons").attr("disabled", false);
            }
        },

        //---------------------------------------------------------------------
        uploadQuote: function() {
            var customerId  = ordersData["customer-data"]["customer-id"];
            var orderNumber = currentOrder["order-number"];

            $("#uploadQuotePDF_Customer").val(customerId);
            $("#uploadQuotePDF_Order").val(orderNumber);

            var formData = new FormData($('#frmQuotePDF')[0]);

            $.ajax({
                url: '/upload-quote',
                type: 'POST',
                xhr: function() {
                    var myXhr = $.ajaxSettings.xhr();
                    if(myXhr.upload) { 
                        myXhr.upload.addEventListener('progress', function(e) {
                            if (e.lengthComputable) {
                                var percentage = ((e.loaded * e.total)/100);
                                $('#quotePDFProgress').width(percentage.toString() + '%');
                            }
                        }, false);
                    }
                    return myXhr;
                },

                //Ajax events
                beforeSend: function() {},
                success: function(data) {
                    PageFunctions.beforeUploadQuote();
                    PageFunctions.showSnack("Su archivo fue recibido correctamente.");
                    $("#upload-quote-dialog").modal("hide");
                    currentOrder.quote = {};
                    currentOrder.quote.filename = "/customers/" + customerId + "/quotes/" + data.filename;
                    currentOrder.quote.sent = data.dateReceived;
                    currentOrder["color-status"] = "success";
                    currentOrder["order-state"]  = "pending-approval";
                    $("#tdQuote").html(moment(currentOrder.quote.sent).format(DateFormats.short));
                },
                error: function(error) {
                    PageFunctions.beforeUploadQuote();
                    PageFunctions.showSnack("Se produjo un error enviando su archivo.");
                    console.log("error: " + error);
                },

                // Form data
                data: formData,

                // Don't worry about content-type
                cache: false,
                contentType: false,
                processData: false
            });
        },

        //---------------------------------------------------------------------
        beforeUploadInvoice: function() {
            $('#invoicePDFProgress').width('0%');
            $("#frmInvoicePDF")[0].reset();
            $("#uploadInvoiceControlButtons").attr("disabled", true);
        },

        //---------------------------------------------------------------------
        validateInvoicePDF: function() {
            var file = document.getElementById("invoicePDF").files[0];
            var name = file.name;
            var size = file.size;
            var type = file.type;

            if (size > ((1024 * 1000) * 5))
            {
                PageFunctions.showSnack("Su archivo es muy grande, intente con uno menor de 5Mb.");
                $("#uploadInvoiceControlButtons").attr("disabled", true);
            }

            if (type !== "application/pdf")
            {
                PageFunctions.showSnack("Su archivo debe ser formato PDF");
                $("#uploadInvoiceControlButtons").attr("disabled", true);
            }

            if ((type == "application/pdf") && (size < ((1024 * 1000) * 5)))
            {
                $("#uploadInvoiceControlButtons").attr("disabled", false);
            }
        },

        //---------------------------------------------------------------------
        uploadInvoice: function() {
            var customerId  = ordersData["customer-data"]["customer-id"];
            var orderNumber = currentOrder["order-number"];

            $("#uploadInvoicePDF_Customer").val(customerId);
            $("#uploadInvoicePDF_Order").val(orderNumber);

            var formData = new FormData($('#frmInvoicePDF')[0]);

            $.ajax({
                url: '/upload-invoice',
                type: 'POST',
                xhr: function() {
                    var myXhr = $.ajaxSettings.xhr();
                    if(myXhr.upload) { 
                        myXhr.upload.addEventListener('progress', function(e) {
                            if (e.lengthComputable) {
                                var percentage = ((e.loaded * e.total)/100);
                                $('#invoicePDFProgress').width(percentage.toString() + '%');
                            }
                        }, false);
                    }
                    return myXhr;
                },

                //Ajax events
                beforeSend: function() {},
                success: function(data) {
                    PageFunctions.beforeUploadInvoice();
                    PageFunctions.showSnack("Su archivo fue recibido correctamente.");
                    $("#upload-invoice-dialog").modal("hide");
                    currentOrder["order-state"]  = "pending-invoice-review";
                    currentOrder.invoice = {};
                    currentOrder.invoice.filename = "/customers/" + customerId + "/invoices/" + data.filename;
                    currentOrder.invoice.sent = data.dateReceived;
                    $("#tdInvoice").html(moment(currentOrder.invoice.sent).format(DateFormats.short));
                },
                error: function(error) {
                    PageFunctions.beforeUploadInvoice();
                    PageFunctions.showSnack("Se produjo un error enviando su archivo.");
                    console.log("error: " + error);
                },

                // Form data
                data: formData,

                // Don't worry about content-type
                cache: false,
                contentType: false,
                processData: false
            });
        },

        //---------------------------------------------------------------------
        // State Machine
        //---------------------------------------------------------------------
        setState: function(newState) {
            switch (newState)
            {
                case "dataLoaded":
                    $('#cardLoading').animateCss('fadeOutLeftBig', function() {
                        $('#cardLoading').hide();
                        $('#cardData').show();
                        $('#cardData').animateCss("fadeInUpBig");
                    }); 
                    break;
                default:
                    break;
            }
        },

        //---------------------------------------------------------------------
        // Utilities
        //---------------------------------------------------------------------
        showSnack: function(text) {
            var options =  {
                content: text, 
                timeout: 5000 
            }

            $.snackbar(options);
        }
    };

    window.PageFunctions = PageFunctions;

} (window.jQuery, window, document));
