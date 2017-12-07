module ExhaustiveCasesWarning exposing (main)

import Html exposing (Html, text)


main =
    log Warning "Low on Cameronium."


type LogLevel
    = Error
    | Info
    | Warning


log : LogLevel -> String -> Html msg
log logLevel message =
    case logLevel of
        Error ->
            text ("Error: " ++ message)

        Info ->
            text ("Info: " ++ message)



-- Will error until this case is added.
-- Warning ->
--     text ("Warning: " ++ message)
