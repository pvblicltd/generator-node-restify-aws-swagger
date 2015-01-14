_ = require "lodash"

# This module creates node-restify-validation validation rules from a Swagger model
#
module.exports = ( model, exclude = [] ) ->
    validation = {}

    properties = model?.properties

    if properties
        for name, property of properties

            # Check the property isn't in the exclude list
            #
            if not _.contains( exclude, name )
                type   = property.type
                format = property.format

                validation[ name ] =
                    isRequired:     property.required or false
                    scope:          "query"
                    description:    property.description

                if property[ "$ref" ]
                    # This needs a better fix. Some kind of isObject validation
                    #
                    validation[ name ].isRequired = false

                switch type
                    when "date"
                        validation[ name ].isDate = true

                    when "string"
                        if property.enum
                            validation[ name ].isIn = property.enum

                        switch format
                            when "UUID"
                                validation[ name ].isUUID   = true
                            when "UUIDv3"
                                validation[ name ].isUUIDv3 = true
                            when "UUIDv4"
                                validation[ name ].isUUIDv4 = true
                            when "url"
                                validation[ name ].isURL    = true
                            when "date"
                                validation[ name ].isDate   = true
                            when "boolean"
                                validation[ name ].isIn = [ "true", "false" ]
                                validation[ name ].swaggerType = "boolean"

                    when "boolean"
                        validation[ name ].isIn = [ "true", "false" ]
                        validation[ name ].swaggerType = "boolean"

                    when "integer"
                        switch format
                            when "int32", "int64"
                                validation[ name ].isNumeric = true
                            else
                                validation[ name ].isFloat = true

                # Add additional properties if available
                #
                validation[ name ].min = property.minimum if property.minimum?
                validation[ name ].max = property.maximum if property.maximum?

    return validation