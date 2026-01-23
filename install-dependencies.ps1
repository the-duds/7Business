# Script de Instalação de Dependências - 7Business Project
# Executa: npm install em todos os diretórios do projeto

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Instalando Dependências - 7Business" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar se npm está instalado
Write-Host "Verificando se npm está instalado..." -ForegroundColor Yellow
$npmCheck = npm --version
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro: npm não está instalado!" -ForegroundColor Red
    Write-Host "Por favor, instale Node.js em: https://nodejs.org/" -ForegroundColor Red
    exit 1
}
Write-Host "✓ npm versão: $npmCheck" -ForegroundColor Green
Write-Host ""

# Diretórios para instalar dependências
$directories = @(
    @{
        path = ".\7Business"
        name = "7Business (Camada 1)"
    },
    @{
        path = ".\7Business\7Business"
        name = "7Business (Camada 2)"
    }
)

# Instalar dependências em cada diretório
$successCount = 0
$failCount = 0

foreach ($dir in $directories) {
    $dirPath = $dir.path
    $dirName = $dir.name
    
    if (Test-Path $dirPath) {
        Write-Host "Instalando dependências em: $dirName" -ForegroundColor Cyan
        Write-Host "Caminho: $dirPath" -ForegroundColor Gray
        
        Push-Location $dirPath
        
        # Executar npm install
        npm install
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✓ Instalação concluída com sucesso em $dirName" -ForegroundColor Green
            $successCount++
        } else {
            Write-Host "❌ Erro na instalação em $dirName" -ForegroundColor Red
            $failCount++
        }
        
        Pop-Location
        Write-Host ""
    } else {
        Write-Host "⚠ Diretório não encontrado: $dirPath" -ForegroundColor Yellow
        $failCount++
    }
}

# Resumo final
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Resumo da Instalação" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "✓ Instalações com sucesso: $successCount" -ForegroundColor Green
Write-Host "❌ Erros encontrados: $failCount" -ForegroundColor Red
Write-Host ""

if ($failCount -eq 0) {
    Write-Host "🎉 Todas as dependências foram instaladas com sucesso!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Próximos passos:" -ForegroundColor Cyan
    Write-Host "1. Para iniciar o desenvolvimento (Camada 2):" -ForegroundColor Gray
    Write-Host "   cd .\7Business\7Business" -ForegroundColor White
    Write-Host "   npm run dev" -ForegroundColor White
    Write-Host ""
    Write-Host "2. Para iniciar o desenvolvimento (Camada 1):" -ForegroundColor Gray
    Write-Host "   cd .\7Business" -ForegroundColor White
    Write-Host "   npm run dev" -ForegroundColor White
    exit 0
} else {
    Write-Host "⚠ Houve problemas durante a instalação. Verifique os erros acima." -ForegroundColor Yellow
    exit 1
}
