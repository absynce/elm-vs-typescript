module ExhaustiveCases exposing (main)

import Html exposing (Html, text)


main =
    log Error "Failed to stop Dr. Kronish!"


type LogLevel
    = Error
    | Info


log : LogLevel -> String -> Html msg
log logLevel message =
    case logLevel of
        Error ->
            text ("Error: " ++ message)

        Info ->
            text ("Info: " ++ message)
