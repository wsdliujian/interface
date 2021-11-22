!macro preInit
SetRegView 64
WriteRegExpandStr HKLM "${INSTALL_REGISTRY_KEY}" InstallLocation "D:\\Proj\\interface_0.2.0"
WriteRegExpandStr HkCU "${INSTALL_REGISTRY_KEY}" InstallLocation "D\\Proj\\interface_0.2.0"
SetRegView 32
WriteRegExpandStr HKLM "${INSTALL_REGISTRY_KEY}" InstallLocation "D:\\Proj\\interface_0.2.0"
WriteRegExpandStr HkCU "${INSTALL_REGISTRY_KEY}" InstallLocation "D:\\Proj\\interface_0.2.0"
!macroend
