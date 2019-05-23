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
        // Objects Initialization Section:
        //---------------------------------------------------------------------
        PageFunctions.createSatisfactionSlider();


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
        // Customer Authorization:
        //---------------------------------------------------------------------
        $("#cmdSendAuthorization").click(function() {
            PageFunctions.sendAuthorization();
        })

        //---------------------------------------------------------------------
        $('#txtSignature').keyup(function() {
            PageFunctions.validateAuthorizationDialog();
        });

        //---------------------------------------------------------------------
        // Customer Document:
        //---------------------------------------------------------------------
        $("#cmdCustomerDocument").click(function() {
            PageFunctions.beforeOpenSendCustomerData();
        });

        //---------------------------------------------------------------------
        $('#clientPDF').change(function() {
            PageFunctions.validateClientPDF();
        });

        //---------------------------------------------------------------------
        $('#cmdSendCustomerDocument').click(function() {
            PageFunctions.sendCustomerDocument();
        });
        
        //---------------------------------------------------------------------
        // Customer Satisfaction
        //---------------------------------------------------------------------
        var shor = document.getElementById("shor");
        shor.noUiSlider.on('update', function(value, handle) {
            PageFunctions.updateSatisfaction(value, handle);
        }); 

        //---------------------------------------------------------------------
        $('#cmdSendCustomerSatisfaction').click(function() {
            PageFunctions.sendCustomerSatisfaction();
        });

        //---------------------------------------------------------------------
        $('#cmdDownloadInvoice').click(function() {
            PageFunctions.downloadInvoice();
        });

        //---------------------------------------------------------------------
        $('#txtDownloadInvoicePassword').keyup(function() {
            PageFunctions.validateDownloadInvoiceDialog();
        });


        //---------------------------------------------------------------------
        // Load Data:
        //---------------------------------------------------------------------
        PageFunctions.getCustomerData("8000");

    });

    //-------------------------------------------------------------------------
    // App Code:
    //-------------------------------------------------------------------------
    var PageFunctions = {

        //---------------------------------------------------------------------
        // Data:
        //---------------------------------------------------------------------
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
        getCustomerData: function(customerId) {
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
            optionsContext.orderState   = currentOrder["order-state"];
            var optionsSource           = $("#hbs-options").html();
            var optionsTemplate         = Handlebars.compile(optionsSource);
            var options                 = optionsTemplate(optionsContext);
            $('.hbs-options-container').html(options);
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
            optionsContext.orderState   = currentOrder["order-state"];

            // Get Source HTML from Script Sections (Templates)
            var headerSource            = $("#hbs-header").html();
            var buttonsSource           = $("#hbs-buttons").html();
            var filterSource            = $("#hbs-filter").html();
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
            var header                  = headerTemplate(ordersData["customer-data"]);
            var buttons                 = buttonsTemplate();
            var filter                  = filterTemplate();
            var table                   = Handlebars.parseHTML(tableTemplate(tableDataContext));
            var vehicleData             = Handlebars.parseHTML(vehicleDataTemplate(vehicleDataContext));
            var vehicleCheck            = vehicleCheckTemplate(vehicleCheckContext);
            var options                 = optionsTemplate(optionsContext);

            // Insert HTML into Sections
            $('.hbs-header-container').append(header);
            $('.hbs-buttons-container').append(buttons);
            $('.hbs-filter-container').append(filter);
            $('.hbs-table-container').append(table);
            $('.hbs-vehicle-data-container').append(vehicleData);
            $('.hbs-vehicle-check-container').append(vehicleCheck);
            $('.hbs-options-container').append(options);

            Handlebars.update();
        },

        //---------------------------------------------------------------------
        filterOrders: function(value) {
            var selected = "Todas";
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
                    selected = "Por Autorizar";
                    $('#master-table>tbody>tr.pending-ppto'          ).css("display", "none");
                    $('#master-table>tbody>tr.pending-approval'      ).css("display", "table-row");
                    $('#master-table>tbody>tr.in-process-ok'         ).css("display", "none");
                    $('#master-table>tbody>tr.in-process-delayed'    ).css("display", "none");
                    $('#master-table>tbody>tr.pending-invoice'       ).css("display", "none");
                    $('#master-table>tbody>tr.pending-invoice-review').css("display", "none");
                    $('#master-table>tbody>tr.finished'              ).css("display", "none");
                    break;
                case 2:
                    selected = "En Proceso";
                    $('#master-table>tbody>tr.pending-ppto'          ).css("display", "none");
                    $('#master-table>tbody>tr.pending-approval'      ).css("display", "none");
                    $('#master-table>tbody>tr.in-process-ok'         ).css("display", "table-row");
                    $('#master-table>tbody>tr.in-process-delayed'    ).css("display", "none");
                    $('#master-table>tbody>tr.pending-invoice'       ).css("display", "none");
                    $('#master-table>tbody>tr.pending-invoice-review').css("display", "none");
                    $('#master-table>tbody>tr.finished'              ).css("display", "none");
                    break;
                case 3:
                    selected = "Retrasadas";
                    $('#master-table>tbody>tr.pending-ppto'          ).css("display", "none");
                    $('#master-table>tbody>tr.pending-approval'      ).css("display", "none");
                    $('#master-table>tbody>tr.in-process-ok'         ).css("display", "none");
                    $('#master-table>tbody>tr.in-process-delayed'    ).css("display", "table-row");
                    $('#master-table>tbody>tr.pending-invoice'       ).css("display", "none");
                    $('#master-table>tbody>tr.pending-invoice-review').css("display", "none");
                    $('#master-table>tbody>tr.finished'              ).css("display", "none");
                    break;
                case 4:
                    selected = "Pendiente Rev. Factura";
                    $('#master-table>tbody>tr.pending-ppto'          ).css("display", "none");
                    $('#master-table>tbody>tr.pending-approval'      ).css("display", "none");
                    $('#master-table>tbody>tr.in-process-ok'         ).css("display", "none");
                    $('#master-table>tbody>tr.in-process-delayed'    ).css("display", "none");
                    $('#master-table>tbody>tr.pending-invoice'       ).css("display", "none");
                    $('#master-table>tbody>tr.pending-invoice-review').css("display", "table-row");
                    $('#master-table>tbody>tr.finished'              ).css("display", "none");
                    break;
                case 5:
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
        createSatisfactionSlider: function() {
            var shor = document.getElementById("shor");
            noUiSlider.create(shor, {
                start: 50,
                range: {
                            min: 0,
                            max: 100
                }
            });
        },

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
                colorScheme           : { thumbnail:{ labelBackground: '#444 !important' } }, 
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
        sendAuthorization: function() {
            var password   = $("#txtSignature").val();
            var customerId = ordersData["customer-data"]["customer-id"];
            var order      = currentOrder["order-number"];

            var sActionUrl = "/authorize-order?";
            var sParams    = "pass="     + password   + "&" + 
                             "customer=" + customerId + "&" +
                             "order="    + order;

            var sUrl       = sActionUrl + sParams;

            $.ajax({
                    url     : sUrl,
                    method  : 'GET',
                    context : document.body
            })
            .success(function(data) {
                currentOrder["signed-approved"] = data.approvalDate;
                currentOrder["color-status"]    = "success";
                currentOrder["order-state"]     = "in-process-ok";
                $("#tdAuthorization").html(moment(data.approvalDate).format(DateFormats.short));
                PageFunctions.showSnack("Su presupuesto ha sido aprovado con fecha: " + moment(currentOrder["signed-approved"]).format(DateFormats.long));
            })
            .error(function(error) {
                PageFunctions.showSnack("Hubo un error autorizando su firma, intente de nuevo...");
                console.log(error.responseText);
            });
        },

        //---------------------------------------------------------------------
        validateAuthorizationDialog: function() {
            if ($.trim($("#txtSignature").val()).length < 7) 
            {
                if ($("#sendAuthorizationControlButtons").children().attr("disabled") !== "disabled")
                {
                    $("#sendAuthorizationControlButtons").children().attr("disabled", "disabled");
                }
            }
            else
            {
                $("#sendAuthorizationControlButtons").children().attr("disabled", false);
            }
        },

        //---------------------------------------------------------------------
        cleanSendAuthorizationDialog: function() {
            $("#frmSendAuthorization")[0].reset();
            $("#sendAuthorizationControlButtons").children().attr("disabled", true);
        },

        //---------------------------------------------------------------------
        sendCustomerDocument: function() {
            var customerId  = ordersData["customer-data"]["customer-id"];
            var orderNumber = currentOrder["order-number"];

            $("#sendCustomerPDF_Customer").val(customerId);
            $("#sendCustomerPDF_Order").val(orderNumber);

            var formData = new FormData($('#frmClientPDF')[0]);

            $.ajax({
                url: '/client-pdf',
                type: 'POST',
                xhr: function() {
                    var myXhr = $.ajaxSettings.xhr();
                    if(myXhr.upload) { 
                        myXhr.upload.addEventListener('progress', function(e) {
                            if (e.lengthComputable) {
                                var percentage = ((e.loaded * e.total)/100);
                                $('#sendPDFProgress').width(percentage.toString() + '%');
                            }
                        }, false);
                    }
                    return myXhr;
                },

                //Ajax events
                beforeSend: function() {},
                success: function(data) {
                    PageFunctions.beforeOpenSendCustomerData();
                    PageFunctions.showSnack("Su archivo fue recibido correctamente.");
                    $("#customer-document-dialog").modal("hide");

                    currentOrder["docs-from-client"].push({
                        "document-name" : "/customers/" + customerId + "/customer_files/" + data.filename
                    });
                },
                error: function(error) {
                    PageFunctions.beforeOpenSendCustomerData();
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
        beforeOpenSendCustomerData: function() {
            $('#sendPDFProgress').width('0%');
            $("#frmClientPDF")[0].reset();
            $("#sendDocumentControlButtons").attr("disabled", true);
        },

        //---------------------------------------------------------------------
        validateClientPDF: function() {
            var file = document.getElementById("clientPDF").files[0];

            var name = file.name;
            var size = file.size;
            var type = file.type;

            if (size > ((1024 * 1000) * 5))
            {
                PageFunctions.showSnack("Su archivo es muy grande, intente con uno menor de 5Mb.");
                $("#sendDocumentControlButtons").attr("disabled", true);
            }

            if (type !== "application/pdf")
            {
                PageFunctions.showSnack("Su archivo debe ser formato PDF");
                $("#sendDocumentControlButtons").attr("disabled", true);
            }

            if ((type == "application/pdf") && (size < ((1024 * 1000) * 5)))
            {
                $("#sendDocumentControlButtons").attr("disabled", false);
            }
        },

        //---------------------------------------------------------------------
        updateSatisfaction: function(value, handle) {

            var newValue = Math.round(value[handle]);
            var satisfactionIndex  = (parseInt(newValue / 20));

            PageFunctions.orderSatisfaction      = newValue;
            PageFunctions.orderSatisfactionIndex = satisfactionIndex;

            $("#labelSatisfactionIndex").text("Mi satisfacción está en el: " + newValue + '%');
            $("#satisfactionImage").attr('src', "images/satisfaction-" + satisfactionIndex + '.png');

        },

        //---------------------------------------------------------------------
        sendCustomerSatisfaction: function() {
            var customerId    = ordersData["customer-data"]["customer-id"];
            var order         = currentOrder["order-number"];
            var satisfaction  = PageFunctions.orderSatisfaction.toString();

            var sActionUrl = "/customer-satisfaction?";
            var sParams    = "customer="     + customerId   + "&" + 
                             "order="        + order        + "&" +
                             "satisfaction=" + satisfaction;

            var sUrl       = sActionUrl + sParams;

            $.ajax({
                    url     : sUrl,
                    method  : 'GET',
                    context : document.body
            })
            .success(function(data) {
                currentOrder.csi = PageFunctions.orderSatisfaction.toString();
                $('#mainSatisfactionImage').attr('src', 'images/satisfaction-' + PageFunctions.orderSatisfactionIndex + '.png');
            })
            .error(function(error) {
                PageFunctions.showSnack("Hubo un error actualizando su satisfacción con esta órden, por favor intente de nuevo...");
                console.log(error.responseText);
            });
        },

        //---------------------------------------------------------------------
        downloadInvoice: function() {
            var customerId  = ordersData["customer-data"]["customer-id"];
            var dataParams  = {
                "verifyInvoiceConfirmation_Customer"     : customerId,
                "verifyInvoiceConfirmation_Order"        : currentOrder["order-number"],
                "verifyInvoiceConfirmation_Confirmation" : $("#txtDownloadInvoicePassword").val()
            }

            $.ajax({
                // Properties
                url: '/verify-invoice-confirmation',
                type: 'POST',
                dataType: "json",
                contentType: "application/x-www-form-urlencoded",
                data: $.param( dataParams ),

                // Events
                success: function(data) {
                    console.log(data);
                    if (data.authenticated == true)
                    {
                        currentOrder["order-state"] = "finished";
                        window.open(currentOrder.invoice.filename);
                    }
                },

                error: function(error) {
                    PageFunctions.showSnack("Hubo un error autorizando su descarga, intente de nuevo...");
                    console.log("error: " + error.responseJSON.message);
                }
            });
        },

        //---------------------------------------------------------------------
        validateDownloadInvoiceDialog: function() {
            console.log($.trim($("#txtDownloadInvoicePassword").val()).length);

            if ($.trim($("#txtDownloadInvoicePassword").val()).length < 7) 
            {
                if ($("#downloadInvoiceControlButtons").children().attr("disabled") !== "disabled")
                {
                    $("#downloadInvoiceControlButtons").children().attr("disabled", "disabled");
                }
            }
            else
            {
                $("#downloadInvoiceControlButtons").children().attr("disabled", false);
            }
        },

        //---------------------------------------------------------------------
        cleanDownloadInvoiceDialog: function() {
            $("#frmDownloadInvoice")[0].reset();
            $("#downloadInvoiceControlButtons").children().attr("disabled", true);
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
