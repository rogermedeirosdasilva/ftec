USE [master]
GO


CREATE DATABASE [Ajudar];
GO

ALTER DATABASE [Ajudar] SET  READ_WRITE 
GO


USE [Ajudar]
GO

/****** Object:  Table [dbo].[Pessoa]    Script Date: 12/12/2017 19:26:56 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Pessoa](
	[CodigoPessoa] [varchar](36) NOT NULL,
	[Nome] [varchar](100) NOT NULL,
	[Documento] [varchar](20) NOT NULL,
	[Email] [varchar](100) NOT NULL,
	[Senha] [varchar](50) NOT NULL,
	[Telefone] [varchar](20) NULL,
	[Tipo] [int] NOT NULL,
	[CEP] [char](8) NULL,
	[Logradouro] [varchar](100) NULL,
	[Numero] [varchar](20) NULL,
	[Bairro] [varchar](100) NULL,
	[Cidade] [varchar](100) NULL,
	[UF] [char](2) NULL,
	[Aprovado] [char](1) NOT NULL,
 CONSTRAINT [PK_Pessoa] PRIMARY KEY CLUSTERED 
(
	[CodigoPessoa] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Pessoa] ADD  DEFAULT ('N') FOR [Aprovado]
GO



USE [Ajudar]
GO

/****** Object:  Table [dbo].[Afinidade]    Script Date: 12/12/2017 19:27:28 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Afinidade](
	[CodigoAfinidade] [varchar](36) NOT NULL,
	[Nome] [varchar](100) NOT NULL,
	[Descricao] [varchar](100) NOT NULL,
 CONSTRAINT [PK_Afinidade] PRIMARY KEY CLUSTERED 
(
	[CodigoAfinidade] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


USE [Ajudar]
GO

/****** Object:  Table [dbo].[Campanha]    Script Date: 12/12/2017 19:27:36 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Campanha](
	[CodigoCampanha] [varchar](36) NOT NULL,
	[Nome] [varchar](100) NOT NULL,
	[Descricao] [varchar](500) NOT NULL,
	[DataInicio] [smalldatetime] NOT NULL,
	[DataTermino] [smalldatetime] NOT NULL,
	[CodigoAfinidade] [varchar](36) NOT NULL,
 CONSTRAINT [PK_Campanha] PRIMARY KEY CLUSTERED 
(
	[CodigoCampanha] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Campanha]  WITH CHECK ADD  CONSTRAINT [FK_Campanha_Afinidade] FOREIGN KEY([CodigoAfinidade])
REFERENCES [dbo].[Afinidade] ([CodigoAfinidade])
GO

ALTER TABLE [dbo].[Campanha] CHECK CONSTRAINT [FK_Campanha_Afinidade]
GO


USE [Ajudar]
GO

/****** Object:  Table [dbo].[PessoaAfinidade]    Script Date: 12/12/2017 19:27:44 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[PessoaAfinidade](
	[CodigoPessoa] [varchar](36) NOT NULL,
	[CodigoAfinidade] [varchar](36) NOT NULL,
 CONSTRAINT [PK_PessoaAfinidade] PRIMARY KEY CLUSTERED 
(
	[CodigoPessoa] ASC,
	[CodigoAfinidade] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[PessoaAfinidade]  WITH CHECK ADD  CONSTRAINT [FK_PessoaAfinidade_Afinidade] FOREIGN KEY([CodigoAfinidade])
REFERENCES [dbo].[Afinidade] ([CodigoAfinidade])
GO

ALTER TABLE [dbo].[PessoaAfinidade] CHECK CONSTRAINT [FK_PessoaAfinidade_Afinidade]
GO

ALTER TABLE [dbo].[PessoaAfinidade]  WITH CHECK ADD  CONSTRAINT [FK_PessoaAfinidade_Pessoa] FOREIGN KEY([CodigoPessoa])
REFERENCES [dbo].[Pessoa] ([CodigoPessoa])
GO

ALTER TABLE [dbo].[PessoaAfinidade] CHECK CONSTRAINT [FK_PessoaAfinidade_Pessoa]
GO




