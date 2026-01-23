@echo off
REM Script de Instalação de Dependências - 7Business Project
REM Executa: npm install em todos os diretórios do projeto

setlocal enabledelayedexpansion

echo.
echo ========================================
echo Instalando Dependências - 7Business
echo ========================================
echo.

REM Verificar se npm está instalado
echo Verificando se npm está instalado...
npm --version >nul 2>&1
if errorlevel 1 (
    echo.
    echo ERRO: npm não está instalado!
    echo Por favor, instale Node.js em: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('npm --version') do set npm_version=%%i
echo OK - npm versão: %npm_version%
echo.

REM Variáveis de controle
set success_count=0
set fail_count=0

REM Instalar em 7Business (Camada 1)
echo Instalando dependências em: 7Business - Camada 1
echo Caminho: .\7Business
if exist ".\7Business\package.json" (
    pushd ".\7Business"
    call npm install
    if errorlevel 1 (
        echo.
        echo ERRO na instalação em 7Business Camada 1
        set /a fail_count+=1
    ) else (
        echo.
        echo OK - Instalação concluída em 7Business Camada 1
        set /a success_count+=1
    )
    popd
) else (
    echo.
    echo AVISO: Diretório não encontrado ou package.json ausente: .\7Business
    set /a fail_count+=1
)
echo.

REM Instalar em 7Business/7Business (Camada 2)
echo Instalando dependências em: 7Business - Camada 2
echo Caminho: .\7Business\7Business
if exist ".\7Business\7Business\package.json" (
    pushd ".\7Business\7Business"
    call npm install
    if errorlevel 1 (
        echo.
        echo ERRO na instalação em 7Business Camada 2
        set /a fail_count+=1
    ) else (
        echo.
        echo OK - Instalação concluída em 7Business Camada 2
        set /a success_count+=1
    )
    popd
) else (
    echo.
    echo AVISO: Diretório não encontrado ou package.json ausente: .\7Business\7Business
    set /a fail_count+=1
)
echo.

REM Resumo Final
echo ========================================
echo Resumo da Instalação
echo ========================================
echo Instalações com sucesso: %success_count%
echo Erros encontrados: %fail_count%
echo.

if %fail_count% equ 0 (
    echo SUCESSO! Todas as dependências foram instaladas!
    echo.
    echo Próximos passos:
    echo 1. Para iniciar o desenvolvimento (Camada 2):
    echo    cd .\7Business\7Business
    echo    npm run dev
    echo.
    echo 2. Para iniciar o desenvolvimento (Camada 1):
    echo    cd .\7Business
    echo    npm run dev
    echo.
) else (
    echo AVISO: Houve problemas durante a instalação. Verifique os erros acima.
)

pause
endlocal
