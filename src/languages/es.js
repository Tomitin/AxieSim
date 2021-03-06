export default {
    translation: {
        language: 'ES',
        components: {
            footer: {
                helperMessage: 'No encontraste lo que necesitabas? Te recomendamos estas páginas:',
                axieZone: '- Axie zone',
                axieInfinity: '- Axie infinity',
                contactUs: '- Contactanos',
                privacyAndLegal: '- Privacidad y Legal',
                copyright: '© 2020 - 2021 AxieSim. All rights reserved.',
            },
            navbar: {
                companyName: 'Axie Sim',
                tools: 'Herramientas',
                trackers: 'Trackers',
                login: 'Iniciar sesión',
            },
            clipboard: {
                copy: 'Copiar al portapapeles',
            },
            clipboardSnackbar: {
                copy: '¡Copiado al portapapeles exitosamente!',
            },
        },
        pages: {
            homepage: {
                title: 'Mejorá tus axies al siguiente nivel.',
                seeTools: 'Ver herramientas',
                earningsSimulator: {
                    title: 'Simulador de ganancias',
                    analizeStrategies:
                        '-¿Querés analizar qué estrategias de ganancias funcionan mejor en el largo plazo?',
                    trackEarnings:
                        '-¿Querés trackear tus ganancias desde que empezaste tu granja de axies con datos en tiempo real?',
                    startHereButton: 'Empezá acá',
                },
                scholarshipTracker: {
                    title: 'Tracker de becados',
                    trackScholars:
                        '-¿Querés trackear a tus becados gastando el menor tiempo posible junto con gráficos personalizados con toda la información que te importa?',
                    checkTracker: 'Entonces, revisá nuestro tracker de becados',
                    checkButton: 'Revisalo acá',
                },
            },
            login: {
                title: 'Iniciar sesión',
                email: 'Email',
                password: 'Contraseña',
                rememberMe: 'Mantener la sesión abierta',
                register: 'Registrarme',
                forgotPassword: '¿Olvidaste tu contraseña?',
            },
            register: {
                title: 'Registro',
                email: 'Email',
                password: 'Contraseña',
                confirmPassword: 'Confirmar contraseña',
                signIn: 'Iniciar sesión',
                forgotPassword: '¿Olvidaste tu contraseña?',
            },
            forgotPassword: {
                title: 'Recuperar contraseña?',
                email: 'Email',
                signIn: 'Iniciar sesión',
                register: 'Registrarme',
            },
            scholarsTracker: {
                scholarAddDialog: {
                    title: 'Agregar nuevo becado',
                    cancel: 'Cancelar',
                    confirm: 'Agregar becado',
                    scholarName: 'Nombre del becado',
                    roninAdress: 'Cuenta Ronin',
                    managerShare: 'Manager: {{share}}% porcentaje',
                    paymentAddress: 'Cuenta de pago',
                },
                scholarsPayments: {
                    title: 'Pago a becados',
                    scholarPaid: '{{scholarName}} ha sido pagado.',
                    payScholar: 'Pagar becado',
                    roninAccount: 'Cuenta Ronin',
                    details: 'Detalles',
                    holdings: 'Inventario',
                    paymentDate: 'Fecha de pago',
                    averageSlp: 'SLP promedio',
                    contractMade: 'Contrato hecho',
                    contractAgreed: '{{managerShare}} Manager / {{scholarShare}} Becado',
                    scholarName: 'Nombre becado',
                    payment: 'Pago',
                    paymentAccount: 'Cuenta de pago',
                    paymentWarning:
                        '* Los pagos tienen tienen el puro propósito de trackear los datos y no de hacer pagos reales.',
                    slpPerDay: '{{slp}}/día',
                },
                scholarsList: {
                    title: 'Lista de becados',
                    editScholar: 'Editar becado',
                    showInactiveScholars: 'Mostrar becados inactivos',
                    addScholar: 'Agregar becado',
                    scholarName: 'Nombre becado',
                    roninAccount: 'Cuenta Ronin',
                    averageSlp: 'SLP promedio',
                    holdings: 'Inventario',
                    nextClaim: 'Próxima cuota',
                    percentageAgreed: '% acordado(Man./Bec.)',
                    slpPerDay: '{{slp}}/día',
                    seeDetails: 'Ver detalles',
                    removeScholarship: 'Eliminar becado',
                    scholarDeleteDialog: {
                        title: '¿Estás seguro?',
                        description:
                            'Este becado no será eliminado por completo sino eliminado del programa de beca. Sus datos pueden ser obtenidos después. Después de 12 meses el becado será eliminado completamente.',
                        confirm: 'Eliminar becado',
                        cancel: 'Cancelar',
                    },
                    successDelete: 'Becado eliminado exitosamente.',
                    successAdd: 'Becado agregado exitosamente.',
                },
                scholarsHomepage: {
                    title: 'Página principal',
                    totalRevenue: 'Ganancias totales',
                    manager: 'Manager',
                    scholar: 'Becado',
                    revenueMade: 'Ganancias obtenidas',
                    revenueThisMonth: 'Este mes',
                    priceList: 'Lista de precios',
                    revenueOverTime: 'Ganancias sobre el tiempo',
                    scholarRevenue: 'Ganancias becado ({{coin}})',
                    managerRevenue: 'Ganancias manager ({{coin}})',
                    activeScholars: 'Becados activos',
                    newScholars: '+{{scholars}} este mes.',
                },
                scholarDetails: {
                    manager: 'Manager',
                    scholar: 'Becado',
                    totalRevenue: 'Ganancias totales',
                    arenaRank: 'Ranking arena:',
                    slpPerDay: 'SLP por día:',
                    holdings: 'Inventario:',
                    slpClaimed: 'SLP ganado:',
                    nextClaim: 'Próxima cuota:',
                    lastClaim: 'Última cuota:',
                    scholarAccount: 'Cuenta de becado:',
                    paymentAccount: 'Cuenta de pago:',
                    days: 'Días',
                    revenueOverTime: 'Ganancias sobre el tiempo',
                    scholarRevenue: 'Ganancias becado ({{coin}})',
                    managerRevenue: 'Ganancias manager ({{coin}})',
                    inventory: 'Inventario',
                    profile: 'Perfil',
                },
            },
        },
    },
};
