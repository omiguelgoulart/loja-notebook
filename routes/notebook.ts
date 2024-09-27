import { PrismaClient, Processador } from "@prisma/client";
import { Router } from "express";
import { z } from "zod";

const prisma = new PrismaClient();
const router = Router();

const noteSchema = z.object({
  modelo: z.string(),
  marca: z.string(),
  processador: z.nativeEnum(Processador),
  preco: z.number(),
  quantidade: z.number(),
  memoriaRam: z.number(),
  tela: z.number(),
});

router.get("/", async (req, res) => {
  try {
    const notebooks = await prisma.notebook.findMany({
      orderBy: { id: "asc" },
    });
    res.status(200).json(notebooks);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

router.post("/", async (req, res) => {
  try {
    const notebook = noteSchema.parse(req.body);
    const newNotebook = await prisma.notebook.create({
      data: notebook,
    });
    res.status(201).json(newNotebook);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.notebook.delete({
      where: { id: Number(id) },
    });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const notebook = noteSchema.parse(req.body);
    const updatedNotebook = await prisma.notebook.update({
      where: { id: Number(id) },
      data: notebook,
    });
    res.status(200).json(updatedNotebook);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { modelo, marca, processador, preco, quantidade, memoriaRam, tela } =
    req.body;

  try {
    const updatedNotebook = await prisma.notebook.update({
      where: { id: Number(id) },
      data: {
        modelo: modelo || undefined,
        marca: marca || undefined,
        processador: processador || undefined,
        preco: preco || undefined,
        quantidade: quantidade || undefined,
        memoriaRam: memoriaRam || undefined,
        tela: tela || undefined,
      },
    });

    res.status(200).json(updatedNotebook);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/grupos/marca/:marca", async (req, res) => {
  const { marca } = req.params;

  try {
    const grupos = await prisma.notebook.findMany({
      where: {
        marca: marca,
      },
      orderBy: {
        id: "asc",
      },
    });

    const count = grupos.length;

    res.status(200).json({
      marca,
      _count: { id: count },
    });
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

router.get("/grupos/modelo/:modelo", async (req, res) => {
  try {
    const grupos = await prisma.notebook.groupBy({
      by: ["modelo"],
      _count: { id: true },
    });
    res.status(200).json(grupos);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

router.get("/grupos/preco/:preco", async (req, res) => {
  try {
    const notebooks = await prisma.notebook.findMany({
      orderBy: { preco: "asc" },
    });
    res.status(200).json(notebooks);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

router.get("/dados/media", async (req, res) => {
  try {
    const media = await prisma.notebook.aggregate({
      _avg: { preco: true },
    });
    res.status(200).json(media);
  } catch (error) {
    res.status(500).json({ erro: (error as Error).message });
  }
});

router.get("/dados/estoque", async (req, res) => {
  try {
    const totalQuantity = await prisma.notebook.aggregate({
      _sum: {
        quantidade: true,
      },
    });

    res.status(200).json({
      totalQuantidade: totalQuantity._sum.quantidade || 0,
    });
  } catch (error) {
    res.status(500).json({ erro: (error as Error).message });
  }
});

router.get("/filtro/:marca/:valor", async (req, res) => {
  try {
    const { marca, valor } = req.params;
    const notebooks = await prisma.notebook.findMany({
      where: {
        marca: marca,
        preco: {
          lte: Number(valor),
        },
      },
    });
    res.status(200).json(notebooks);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

router.get("/filtro/marcas", async (req, res) => {
  try {
    const marcas = await prisma.notebook.groupBy({
      by: ["marca"],
      _count: {
        id: true,
      },
    });

    const resultado = marcas.map((marca) => ({
      marca: marca.marca,
      totalNotebooks: marca._count.id,
    }));

    res.status(200).json(resultado);
  } catch (error) {
    res.status(500).json({ erro: (error as Error).message });
  }
});

router.get("/preco-crescente", async (req, res) => {
  try {
    const notebooks = await prisma.notebook.findMany({
      orderBy: { preco: "asc" },
    });
    res.status(200).json(notebooks);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});
export default router;
